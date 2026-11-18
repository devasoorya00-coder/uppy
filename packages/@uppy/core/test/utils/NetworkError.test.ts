import { describe, expect, it } from 'vitest'
import NetworkError from '../../lib/utils/NetworkError.js'

describe('NetworkError', () => {
  it('should use the default English message when no custom message is supplied', () => {
    const err = new NetworkError(new Error('cause'))
    expect(err.message).toEqual(
      'This looks like a network error, the endpoint might be blocked by an internet provider or a firewall.',
    )
    expect(err.isNetworkError).toEqual(true)
  })

  it('should use a custom message when supplied as the third argument', () => {
    const err = new NetworkError(new Error('cause'), null, 'Custom message')
    expect(err.message).toEqual('Custom message')
    expect(err.isNetworkError).toEqual(true)
  })

  it('should preserve backward compatibility with two-argument calls', () => {
    const xhr = {} as XMLHttpRequest
    const err = new NetworkError(new Error('cause'), xhr)
    expect(err.request).toEqual(xhr)
    expect(err.message).toContain('network error')
  })

  it('should preserve backward compatibility with one-argument calls', () => {
    const cause = new Error('connection failed')
    const err = new NetworkError(cause)
    expect(err.cause).toEqual(cause)
    expect(err.isNetworkError).toEqual(true)
    expect(err.request).toBeNull()
  })
})
