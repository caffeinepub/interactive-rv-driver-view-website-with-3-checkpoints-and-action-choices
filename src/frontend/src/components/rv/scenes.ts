export interface SceneData {
  id: number;
  backgroundImage: string;
  videoSrc?: string;
  title: string;
  description: string;
  isDarkened?: boolean;
}

// First video: Journey start to rest point
export const video1Scene: SceneData = {
  id: 1,
  backgroundImage: '/assets/generated/road-morning.dim_1920x1080.png',
  videoSrc: '/assets/mixkit-traveling-on-the-highway-on-a-sunny-day-42368-hd-ready.mp4',
  title: 'Morning Journey',
  description: 'Starting your RV adventure on the open road'
};

// Second video: Rest point to halt issue
export const video2Scene: SceneData = {
  id: 2,
  backgroundImage: '/assets/generated/road-sunset.dim_1920x1080.png',
  videoSrc: '/assets/mixkit-52453-video-52453-hd-ready.mp4',
  title: 'Continuing Journey',
  description: 'The road stretches ahead as you continue your adventure'
};

// Halt issue scene (static image)
export const haltIssueScene: SceneData = {
  id: 3,
  backgroundImage: '/assets/generated/rv-journey-halt-issue.dim_1920x1080.png',
  title: 'Journey Paused',
  description: 'An unexpected issue requires attention'
};

// Night road scene (static image after issue resolution)
export const nightRoadScene: SceneData = {
  id: 4,
  backgroundImage: '/assets/generated/road-night.dim_1920x1080.png',
  title: 'Night Road',
  description: 'The journey continues under the stars'
};

// Campfire destination scene (final destination)
export const campfireDestinationScene: SceneData = {
  id: 5,
  backgroundImage: '/assets/generated/rv-destination-campfire.dim_1920x1080.png',
  title: 'Campfire Destination',
  description: 'A warm campfire awaits under the starlit sky'
};
