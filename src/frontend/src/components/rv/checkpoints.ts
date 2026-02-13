export interface ActionItem {
  id: string;
  label: string;
  description: string;
  icon: string;
  consumption: number;
}

export interface CheckpointData {
  id: number;
  title: string;
  subtitle: string;
  actions: ActionItem[];
}

export const checkpoints: CheckpointData[] = [
  {
    id: 1,
    title: 'Rest Stop',
    subtitle: 'Time for a quick break at the roadside rest area',
    actions: [
      {
        id: 'coffee',
        label: 'Brew Coffee',
        description: 'Make a fresh cup to stay energized',
        icon: '☕',
        consumption: 20
      },
      {
        id: 'freshen',
        label: 'Freshen Up',
        description: 'Wash up and feel refreshed',
        icon: '💧',
        consumption: 15
      },
      {
        id: 'snack',
        label: 'Grab Refreshments',
        description: 'Quick bite and a cold drink',
        icon: '🥤',
        consumption: 8
      },
      {
        id: 'rinse',
        label: 'Rinse Containers',
        description: 'Clean your travel mugs and bottles',
        icon: '🧴',
        consumption: 10
      }
    ]
  },
  {
    id: 2,
    title: 'Scenic Overlook',
    subtitle: 'A beautiful viewpoint to enjoy the landscape',
    actions: [
      {
        id: 'tea',
        label: 'Make Tea',
        description: 'Brew a soothing cup while enjoying the view',
        icon: '🍵',
        consumption: 18
      },
      {
        id: 'wash',
        label: 'Clean Up',
        description: 'Tidy the RV interior',
        icon: '🧼',
        consumption: 12
      },
      {
        id: 'juice',
        label: 'Fresh Juice',
        description: 'Prepare a refreshing drink',
        icon: '🧃',
        consumption: 10
      },
      {
        id: 'wipe',
        label: 'Wipe Surfaces',
        description: 'Clean counters and tables',
        icon: '🧽',
        consumption: 8
      }
    ]
  },
  {
    id: 3,
    title: 'Campground',
    subtitle: 'Final stop for the night at a cozy campground',
    actions: [
      {
        id: 'cook',
        label: 'Cook Dinner',
        description: 'Prepare a warm meal after the long drive',
        icon: '🍳',
        consumption: 25
      },
      {
        id: 'dishes',
        label: 'Wash Dishes',
        description: 'Clean up after your meal',
        icon: '🍽️',
        consumption: 18
      },
      {
        id: 'shower',
        label: 'Take Shower',
        description: 'Freshen up before settling in',
        icon: '🚿',
        consumption: 22
      },
      {
        id: 'laundry',
        label: 'Quick Laundry',
        description: 'Rinse a few essentials',
        icon: '👕',
        consumption: 15
      }
    ]
  }
];
