export enum EAppState {
  Unauthenticated,
  Loading,
  Configuration,
  Player,
}
export interface sp_image {
  url: string
  height: number
  width: number
}

export interface sp_profile {
  country: string
  display_name: string
  email: string
  explicit_content: {
    filter_enabled: true
    filter_locked: true
  }
  external_urls: {
    spotify: string
  }
  followers: {
    href: string
    total: number
  }
  href: string
  id: string
  images: sp_image[]
  product: string
  type: string
  uri: string
}

export interface sp_playlist {
  collaborative: true
  description: string
  external_urls: {
    spotify: string
  }
  followers: {
    href: string
    total: 0
  }
  href: string
  id: string
  images: sp_image[]
  name: string
  owner: {
    external_urls: {
      spotify: string
    }
    followers: {
      href: string
      total: 0
    }
    href: string
    id: string
    type: string
    uri: string
    display_name: string
  }
  public: true
  snapshot_id: string
  tracks: {
    href: string
    items: sp_track[]
    limit: number
    next: string
    offset: number
    previous: string
    total: number
  }
  type: string
  uri: string
}

export interface sp_track {}
