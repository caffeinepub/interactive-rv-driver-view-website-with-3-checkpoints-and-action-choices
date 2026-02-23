import { useEffect, useRef } from 'react';
import { useRVFlow } from '../../hooks/useRVFlow';
import { StartJourneyScreen } from './StartJourneyScreen';
import { TravelScene } from './TravelScene';
import { TravelVideoScene } from './TravelVideoScene';
import { BreakStopReachedOverlay } from './BreakStopReachedOverlay';
import { TripComplete } from './TripComplete';
import { ProgressIndicator } from './ProgressIndicator';
import { JourneyHaltIssueOverlay } from './JourneyHaltIssueOverlay';
import { CampfireEndScreen } from './CampfireEndScreen';
import { video1Scene, video2Scene, haltIssueScene, nightRoadScene, campfireDestinationScene } from './scenes';
import { useSfx } from '../../hooks/useSfx';

export function RVExperience() {
  const { 
    flowState, 
    startJourney,
    advanceToRestPoint,
    continueFromRestPoint,
    showHaltIssue,
    resolveIssue,
    viewNightRoad,
    completeJourney,
    restart 
  } = useRVFlow();

  // Guard to prevent duplicate triggers
  const isAdvancingRef = useRef(false);

  // Sound effects with correct paths
  const backgroundAmbientSfx = useSfx('/assets/sounds/traveling-ambient.mp3', { volume: 0.3, loop: true });
  const travelTransitionSfx = useSfx('/assets/sounds/traveling-ambient.mp3', { volume: 0.5 });

  // Reset advancing guard when state changes
  useEffect(() => {
    isAdvancingRef.current = false;
  }, [flowState.type]);

  // Handle background ambient audio - plays throughout entire journey
  useEffect(() => {
    if (flowState.type !== 'start' && flowState.type !== 'complete') {
      // Small delay to ensure user interaction has occurred
      const timer = setTimeout(() => {
        backgroundAmbientSfx.play();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      backgroundAmbientSfx.stop();
    }
  }, [flowState.type]);

  // Play travel transition sound when entering traveling states
  useEffect(() => {
    if (flowState.type === 'traveling_video_1' || flowState.type === 'traveling_video_2') {
      const timer = setTimeout(() => {
        travelTransitionSfx.play();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [flowState.type]);

  const handleUserAdvanceToRestPoint = () => {
    if (isAdvancingRef.current) return;
    isAdvancingRef.current = true;
    advanceToRestPoint();
  };

  const handleUserAdvanceToIssue = () => {
    if (isAdvancingRef.current) return;
    isAdvancingRef.current = true;
    showHaltIssue();
  };

  const handleUserViewNightRoad = () => {
    if (isAdvancingRef.current) return;
    isAdvancingRef.current = true;
    viewNightRoad();
  };

  const renderContent = () => {
    switch (flowState.type) {
      case 'start': {
        return <StartJourneyScreen onStart={startJourney} />;
      }

      case 'traveling_video_1': {
        return (
          <TravelVideoScene
            videoSrc={video1Scene.videoSrc!}
            backgroundImage={video1Scene.backgroundImage}
            title={video1Scene.title}
            description={video1Scene.description}
            isClickable={true}
            onClick={handleUserAdvanceToRestPoint}
            hintText="Click anywhere to continue"
          />
        );
      }
      
      case 'at_rest_point': {
        return (
          <>
            <TravelScene 
              backgroundImage={video1Scene.backgroundImage}
              title={video1Scene.title}
              description={video1Scene.description}
            />
            <BreakStopReachedOverlay
              breakStopNumber={1}
              onContinue={continueFromRestPoint}
            />
          </>
        );
      }

      case 'traveling_video_2': {
        return (
          <TravelVideoScene
            videoSrc={video2Scene.videoSrc!}
            backgroundImage={video2Scene.backgroundImage}
            title={video2Scene.title}
            description={video2Scene.description}
            isClickable={true}
            onClick={handleUserAdvanceToIssue}
            hintText="Click anywhere to continue"
          />
        );
      }

      case 'journey_halt_issue': {
        return (
          <>
            <TravelScene 
              backgroundImage={haltIssueScene.backgroundImage}
              title={haltIssueScene.title}
              description={haltIssueScene.description}
            />
            <JourneyHaltIssueOverlay onResolve={resolveIssue} />
          </>
        );
      }

      case 'night_road': {
        return (
          <TravelScene 
            backgroundImage={nightRoadScene.backgroundImage}
            title={nightRoadScene.title}
            description={nightRoadScene.description}
            isClickable={true}
            onClick={handleUserViewNightRoad}
            hintText="Click anywhere to arrive at destination"
          />
        );
      }

      case 'destination_arrived': {
        return (
          <>
            <TravelScene 
              backgroundImage={campfireDestinationScene.backgroundImage}
              title={campfireDestinationScene.title}
              description={campfireDestinationScene.description}
            />
            <CampfireEndScreen onContinue={completeJourney} />
          </>
        );
      }
      
      case 'complete': {
        return (
          <>
            <TravelScene 
              backgroundImage={campfireDestinationScene.backgroundImage}
              title={campfireDestinationScene.title}
              description={campfireDestinationScene.description}
            />
            <TripComplete onRestart={restart} />
          </>
        );
      }
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {renderContent()}
      {flowState.type !== 'start' && <ProgressIndicator flowState={flowState} />}
    </div>
  );
}
