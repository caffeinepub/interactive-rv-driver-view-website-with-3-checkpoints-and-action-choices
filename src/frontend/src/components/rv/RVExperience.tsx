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
import { scenes, haltIssueScene, campfireDestinationScene } from './scenes';
import { useSfx } from '../../hooks/useSfx';

export function RVExperience() {
  const { 
    flowState, 
    startJourney,
    startBreakStop, 
    continueFromBreakStop,
    showPostBreakRoad,
    showHaltIssue,
    resolveIssue,
    proceedFromCelebration,
    arriveAtDestination,
    completeJourney,
    restart 
  } = useRVFlow();

  // Guard to prevent duplicate break stop triggers during traveling
  const isAdvancingRef = useRef(false);

  // Sound effects with correct paths
  const backgroundAmbientSfx = useSfx('/assets/sounds/traveling-ambient.mp3', { volume: 0.3, loop: true });
  const travelTransitionSfx = useSfx('/assets/sounds/traveling-ambient.mp3', { volume: 0.5 });

  // Reset advancing guard when leaving traveling state
  useEffect(() => {
    if (flowState.type !== 'traveling') {
      isAdvancingRef.current = false;
    }
  }, [flowState.type]);

  // Auto-advance through post-break-stop-delay to post-break-road-to-issue
  useEffect(() => {
    if (flowState.type === 'post-break-stop-delay') {
      const timer = setTimeout(() => {
        showPostBreakRoad();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [flowState, showPostBreakRoad]);

  // Auto-advance through celebration state to post-issue-road-to-destination
  useEffect(() => {
    if (flowState.type === 'celebration') {
      const timer = setTimeout(() => {
        proceedFromCelebration();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [flowState, proceedFromCelebration]);

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
    if (flowState.type === 'traveling' || flowState.type === 'post-break-road-to-issue' || flowState.type === 'post-issue-road-to-destination') {
      const timer = setTimeout(() => {
        travelTransitionSfx.play();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [flowState.type]);

  const handleUserAdvanceToBreakStop = () => {
    if (isAdvancingRef.current) return;
    isAdvancingRef.current = true;
    startBreakStop(1);
  };

  const renderTravelScene = (scene: typeof scenes[0], isClickable: boolean, onClick?: () => void, hintText?: string) => {
    if (scene.videoSrc) {
      return (
        <TravelVideoScene
          videoSrc={scene.videoSrc}
          backgroundImage={scene.backgroundImage}
          title={scene.title}
          description={scene.description}
          isClickable={isClickable}
          onClick={onClick}
          hintText={hintText}
          isDarkened={scene.isDarkened}
        />
      );
    }
    
    return (
      <TravelScene 
        backgroundImage={scene.backgroundImage}
        title={scene.title}
        description={scene.description}
        isClickable={isClickable}
        onClick={onClick}
        hintText={hintText}
      />
    );
  };

  const renderContent = () => {
    switch (flowState.type) {
      case 'start': {
        return <StartJourneyScreen onStart={startJourney} />;
      }

      case 'traveling': {
        const scene = scenes[0]; // Morning scene for initial travel
        return renderTravelScene(scene, true, handleUserAdvanceToBreakStop);
      }
      
      case 'break-stop': {
        const scene = scenes[0];
        
        return (
          <>
            {renderTravelScene(scene, false)}
            <BreakStopReachedOverlay
              breakStopNumber={flowState.breakStopNumber}
              onContinue={continueFromBreakStop}
            />
          </>
        );
      }

      case 'post-break-stop-delay': {
        return renderTravelScene(scenes[0], false);
      }

      case 'post-break-road-to-issue': {
        const scene = scenes[1]; // Sunset scene for post-break travel
        return renderTravelScene(scene, true, showHaltIssue, "Click anywhere to continue");
      }

      case 'halt-issue': {
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

      case 'celebration': {
        return (
          <TravelScene 
            backgroundImage={haltIssueScene.backgroundImage}
            title={haltIssueScene.title}
            description={haltIssueScene.description}
          />
        );
      }

      case 'post-issue-road-to-destination': {
        const scene = scenes[3]; // Night scene for final approach
        return renderTravelScene(scene, true, arriveAtDestination, "Click anywhere to arrive at campfire");
      }

      case 'traveling-to-destination': {
        return (
          <>
            <TravelScene 
              backgroundImage={campfireDestinationScene.backgroundImage}
              title="Arriving at Destination"
              description="Your campfire awaits..."
            />
          </>
        );
      }

      case 'destination': {
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
