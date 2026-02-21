import { useEffect, useRef } from 'react';
import { useRVFlow } from '../../hooks/useRVFlow';
import { StartJourneyScreen } from './StartJourneyScreen';
import { TravelVideoScene } from './TravelVideoScene';
import { TravelScene } from './TravelScene';
import { BreakStopReachedOverlay } from './BreakStopReachedOverlay';
import { TripComplete } from './TripComplete';
import { ProgressIndicator } from './ProgressIndicator';
import { JourneyHaltIssueOverlay } from './JourneyHaltIssueOverlay';
import { CampfireEndScreen } from './CampfireEndScreen';
import { ClickToContinueHint } from './ClickToContinueHint';
import { scenes, haltIssueScene, campfireDestinationScene } from './scenes';
import { useSfx } from '../../hooks/useSfx';

export function RVExperience() {
  const { 
    flowState, 
    startJourney,
    startBreakStop, 
    continueFromBreakStop,
    showHaltIssue,
    resolveIssue,
    proceedFromCelebration,
    arriveAtDestination,
    completeJourney,
    restart 
  } = useRVFlow();

  // Guard to prevent duplicate break stop triggers during traveling
  const isAdvancingRef = useRef(false);

  // Sound effects
  const travelingSfx = useSfx('/assets/sounds/traveling-ambient.mp3', { volume: 0.3, loop: true });
  const campfireSfx = useSfx('/assets/sounds/campfire-arrival.mp3', { volume: 0.6 });

  // Reset advancing guard when leaving traveling state
  useEffect(() => {
    if (flowState.type !== 'traveling') {
      isAdvancingRef.current = false;
    }
  }, [flowState.type]);

  // Auto-advance through celebration state to traveling-to-destination
  useEffect(() => {
    if (flowState.type === 'celebration') {
      const timer = setTimeout(() => {
        proceedFromCelebration();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [flowState, proceedFromCelebration]);

  // Handle traveling loop audio
  useEffect(() => {
    if (flowState.type === 'traveling' || flowState.type === 'traveling-to-destination') {
      travelingSfx.play();
    } else {
      travelingSfx.stop();
    }
  }, [flowState.type]);

  // Play campfire celebration sound when arriving at destination
  useEffect(() => {
    if (flowState.type === 'destination') {
      campfireSfx.play();
    }
  }, [flowState.type]);

  const handleUserAdvanceToBreakStop = (breakStopNumber: number) => {
    if (isAdvancingRef.current) return;
    isAdvancingRef.current = true;
    startBreakStop(breakStopNumber);
  };

  const renderContent = () => {
    switch (flowState.type) {
      case 'start': {
        return <StartJourneyScreen onStart={startJourney} />;
      }

      case 'traveling': {
        const segmentKey = `traveling-segment-${flowState.segment}`;
        return (
          <TravelVideoScene 
            onUserAdvance={() => handleUserAdvanceToBreakStop(1)}
            enableTimer={false}
            segmentKey={segmentKey}
          />
        );
      }
      
      case 'break-stop': {
        const scene = scenes[0]; // Always use first scene for the single break stop
        
        return (
          <>
            <TravelScene 
              backgroundImage={scene.backgroundImage}
              title={scene.title}
              description={scene.description}
            />
            <BreakStopReachedOverlay
              breakStopNumber={flowState.breakStopNumber}
              onContinue={continueFromBreakStop}
            />
          </>
        );
      }

      case 'post-break-stop-delay': {
        return (
          <>
            <TravelScene 
              backgroundImage={scenes[0].backgroundImage}
              title={scenes[0].title}
              description={scenes[0].description}
            />
            <ClickToContinueHint 
              onContinue={showHaltIssue}
              message="Continue journey"
            />
          </>
        );
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

      case 'traveling-to-destination': {
        return (
          <>
            <TravelScene 
              backgroundImage={campfireDestinationScene.backgroundImage}
              title="Arriving at Destination"
              description="Your campfire awaits..."
            />
            <ClickToContinueHint 
              onContinue={arriveAtDestination}
              message="Arrive at campfire"
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
