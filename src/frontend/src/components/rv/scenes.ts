export interface SceneData {
  id: number;
  backgroundImage: string;
  title: string;
  description: string;
}

export const scenes: SceneData[] = [
  {
    id: 1,
    backgroundImage: '/assets/generated/rv-scene-1.dim_1920x1080.png',
    title: 'Morning Highway',
    description: 'The open road stretches ahead under clear blue skies'
  },
  {
    id: 2,
    backgroundImage: '/assets/generated/rv-scene-2.dim_1920x1080.png',
    title: 'Golden Hour Drive',
    description: 'Sunset paints the highway in warm amber tones'
  },
  {
    id: 3,
    backgroundImage: '/assets/generated/rv-scene-3.dim_1920x1080.png',
    title: 'Rainy Road',
    description: 'Wipers clear the view as rain drums on the windshield'
  },
  {
    id: 4,
    backgroundImage: '/assets/generated/rv-scene-4.dim_1920x1080.png',
    title: 'Night Journey',
    description: 'Headlights pierce the darkness of the night road'
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
