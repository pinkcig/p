export interface IActivityContent {
  state: (state?: string) => string;
  details: (details?: string) => string;
}

// https://github.com/200hash6955/use-lanyard

export interface Presence {
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  listening_to_spotify: boolean;
  activities: Array<Activity>;
  discord_status: string;
  spotify: Spotify | null;
  discord_user: Discord;
  kv: {
    location: string;
  };
}

export interface HTTPResponse {
  success: boolean;
  data: Presence | undefined;
}

interface Spotify {
  track_id: string;
  timestamps: {
    start: number;
    end: number;
  };
  song: string;
  artist: string;
  album_art_url: string;
  album: string;
}

interface Discord {
  username: string;
  public_flags: number;
  id: string;
  discriminator: string;
  avatar: string;
}

export interface Activity {
  type: number;
  timestamps: {
    start: number;
    end: number;
  };
  sync_id?: string;
  state?: string;
  session_id?: string;
  party?: {
    id: string;
  };
  name: string;
  id: string;
  flags?: number;
  details?: string;
  created_at: number;
  application_id?: number;
  assets: {
    small_text?: string;
    small_image?: number;
    large_text?: string;
    large_image?: number;
  };
}
