export interface SceneData {
  id: number;
  backgroundImage: string;
  videoSrc?: string;
  title: string;
  description: string;
  isDarkened?: boolean;
}

export const scenes: SceneData[] = [
  {
    id: 1,
    backgroundImage: '/assets/generated/road-morning.dim_1920x1080.png',
    videoSrc: '/assets/mixkit-traveling-on-the-highway-on-a-sunny-day-42368-hd-ready.mp4',
    title: 'Morning Highway',
    description: 'The open road stretches ahead under clear blue skies'
  },
  {
    id: 2,
    backgroundImage: '/assets/generated/road-sunset.dim_1920x1080.png',
    videoSrc: '/assets/mixkit-52453-video-52453-hd-ready.mp4',
    title: 'Golden Hour Drive',
    description: 'Sunset paints the highway in warm amber tones'
  },
  {
    id: 3,
    backgroundImage: '/assets/generated/road-evening.dim_1920x1080.png',
    videoSrc: '/assets/mixkit-52427-video-52427-hd-ready.mp4',
    title: 'Evening Road',
    description: 'The day transitions to dusk on the scenic highway'
  },
  {
    id: 4,
    backgroundImage: '/assets/generated/road-night.dim_1920x1080.png',
    videoSrc: '/assets/mixkit-52427-video-52427-hd-ready.mp4',
    title: 'Night Journey',
    description: 'Headlights pierce the darkness of the night road',
    isDarkened: true
  }
];

export const haltIssueScene: SceneData = {
  id: 5,
  backgroundImage: '/assets/generated/rv-journey-halt-issue.dim_1920x1080.png',
  title: 'Journey Paused',
  description: 'An unexpected issue requires attention'
};

export const campfireDestinationScene: SceneData = {
  id: 6,
  backgroundImage: '/assets/generated/rv-destination-campfire.dim_1920x1080.png',
  title: 'Campfire Destination',
  description: 'A warm campfire awaits under the starlit sky'
};
