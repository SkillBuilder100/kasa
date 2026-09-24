import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import useFetch from './useFetch.js'

// Simule une réponse de l'API
const mockResponse = (status, body) =>
  Promise.resolve({ ok: status >= 200 && status < 300, status, json: () => Promise.resolve(body) })

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('useFetch (hook personnalisé)', () => {
  it('indique le chargement puis renvoie les données', async () => {
    vi.stubGlobal('fetch', vi.fn(() => mockResponse(200, [{ id: '1' }])))
    const { result } = renderHook(() => useFetch('/api/properties'))

    expect(result.current).toEqual({ data: null, error: null, isLoading: true })
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.data).toEqual([{ id: '1' }])
    expect(result.current.error).toBeNull()
  })

  it("renvoie une erreur avec le code 404 quand l'API ne trouve pas la ressource", async () => {
    vi.stubGlobal('fetch', vi.fn(() => mockResponse(404, 'Not found')))
    const { result } = renderHook(() => useFetch('/api/properties/xyz'))

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.data).toBeNull()
    expect(result.current.error.status).toBe(404)
  })

  it("renvoie une erreur quand l'API ne répond pas", async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new TypeError('Failed to fetch'))))
    const { result } = renderHook(() => useFetch('/api/properties'))

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.data).toBeNull()
    expect(result.current.error.message).toBe('Failed to fetch')
  })

  it("relance la requête quand l'URL change", async () => {
    const fetchMock = vi.fn((url) => mockResponse(200, { url }))
    vi.stubGlobal('fetch', fetchMock)
    const { result, rerender } = renderHook(({ url }) => useFetch(url), {
      initialProps: { url: '/api/a' },
    })
    await waitFor(() => expect(result.current.data).toEqual({ url: '/api/a' }))

    rerender({ url: '/api/b' })
    expect(result.current.isLoading).toBe(true)
    await waitFor(() => expect(result.current.data).toEqual({ url: '/api/b' }))
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('annule la requête quand le composant disparaît, sans erreur', async () => {
    let signal
    vi.stubGlobal(
      'fetch',
      vi.fn((url, options) => {
        signal = options.signal
        return new Promise((resolve, reject) => {
          signal.addEventListener('abort', () =>
            reject(new DOMException('Aborted', 'AbortError')),
          )
        })
      }),
    )
    const { result, unmount } = renderHook(() => useFetch('/api/properties'))
    unmount()
    expect(signal.aborted).toBe(true)
    // La requête annulée ne produit ni donnée ni erreur
    expect(result.current.error).toBeNull()
  })
})
