declare module NodeJS  {
  interface Global {
    chai:any
    chaiAsPromised:any
    expect:any
    assert:any
    request:any
    sinon:any
    nock:any
    sleep:any
    apps:any
    server:any
  }
}
