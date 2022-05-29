class MockResponse {
  public json: (() => Promise<unknown>);
  private _status: number;

  constructor(
    protected response: unknown,
    status?: number,
  ) {
    const json = jest.fn();
    json.mockImplementationOnce(async () => this.response);

    this.json = json;

    this._status = status ?? 200;
  }

  get status() {
    return this._status;
  }

  get ok() {
    return this._status >= 200 && this._status < 300;
  }
}

function makeFetchWithResponse(response: Record<string | number, unknown> | unknown[], status?: number) {
  const res = new MockResponse(response, status);

  const fetch = jest.fn();
  fetch.mockImplementationOnce(async () => res);

  return {
    fetch,
    response: res,
  };
}

function makeFetchWithError(error: Error) {
  const fetch = jest.fn();
  fetch.mockImplementationOnce(async () => {
    throw error;
  });

  return { fetch };
}

export {
  makeFetchWithResponse,
  makeFetchWithError,
};