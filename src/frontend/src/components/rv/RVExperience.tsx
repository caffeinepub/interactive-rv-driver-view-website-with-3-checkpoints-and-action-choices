import { useEffect, useRef } from 'react';
import { useRVFlow } from '../../hooks/useRVFlow';
import { StartJourneyScreen } from './StartJourneyScreen';
import { TravelVideoScene } from './TravelVideoScene';
import { TravelScene } from './TravelScene';
import { CheckpointOverlay } from './CheckpointOverlay';
import { ActionPlayback } from './ActionPlayback';
import { TravelTransition } from './TravelTransition';
import { TripComplete } from './TripComplete';
import { ProgressIndicator } from './ProgressIndicator';
import { JourneyHaltIssueOverlay } from './JourneyHaltIssueOverlay';
import { CampfireEndScreen } from './CampfireEndScreen';
import { scenes, haltIssueScene, campfireDestinationScene } from './scenes';
import { checkpoints } from './checkpoints';

export function RVExperience() {
  const { 
    flowState, 
    startJourney,
    startCheckpoint, 
    toggleAction, 
    completeCheckpoint,
    finishPlayback,
    showHaltIssue,
    continueToNextSegment,
    resolveIssue,
    proceedFromCelebration,
    arriveAtDestination,
    completeJourney,
    restart 
  } = useRVFlow();

  // Guard to prevent duplicate checkpoint triggers during traveling
  const isAdvancingRef = useRef(false);

  // Reset advancing guard when leaving traveling state
  useEffect(() => {
    if (flowState.type !== 'traveling') {
      isAdvancingRef.current = false;
    }
  }, [flowState.type]);

  // Auto-continue after transition
  useEffect(() => {
    if (flowState.type === 'transition') {
      const timer = setTimeout(() => {
        continueToNextSegment();
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, [flowState, continueToNextSegment]);

  // Delay showing halt-issue overlay by 2-3 seconds after checkpoint 3
  useEffect(() => {
    if (flowState.type === 'post-checkpoint-3-delay') {
      const timer = setTimeout(() => {
        showHaltIssue();
      }, 2500); // 2.5 seconds delay
      
      return () => clearTimeout(timer);
    }
  }, [flowState, showHaltIssue]);

  // Auto-advance through celebration state to traveling-to-destination
  useEffect(() => {
    if (flowState.type === 'celebration') {
      const timer = setTimeout(() => {
        proceedFromCelebration();
      }, 100); // Immediate transition
      
      return () => clearTimeout(timer);
    }
  }, [flowState, proceedFromCelebration]);

  // Auto-advance from traveling-to-destination to destination after 2 seconds
  useEffect(() => {
    if (flowState.type === 'traveling-to-destination') {
      const timer = setTimeout(() => {
        arriveAtDestination();
      }, 2000); // 2 seconds delay
      
      return () => clearTimeout(timer);
    }
  }, [flowState, arriveAtDestination]);

  const handleUserAdvanceToCheckpoint = (checkpointNumber: number) => {
    if (isAdvancingRef.current) return;
    isAdvancingRef.current = true;
    startCheckpoint(checkpointNumber);
  };

  const renderContent = () => {
    switch (flowState.type) {
      case 'start': {
        return <StartJourneyScreen onStart={startJourney} />;
      }

      case 'traveling': {
        // Create unique segment key for resetting TravelVideoScene state
        const segmentKey = `traveling-segment-${flowState.segment}`;
        return (
          <TravelVideoScene 
            onUserAdvance={() => handleUserAdvanceToCheckpoint(flowState.segment)}
            enableTimer={false}
            segmentKey={segmentKey}
          />
        );
      }
      
      case 'checkpoint': {
        const checkpoint = checkpoints[flowState.checkpointNumber - 1];
        const scene = scenes[flowState.checkpointNumber - 1];
        
        const actionConsumptionMap: Record<string, number> = {};
        checkpoint.actions.forEach(action => {
          actionConsumptionMap[action.id] = action.consumption;
        });
        
        return (
          <>
            <TravelScene 
              backgroundImage={scene.backgroundImage}
              title={scene.title}
              description={scene.description}
            />
            <CheckpointOverlay
              checkpoint={checkpoint}
              selectedActions={flowState.selectedActions}
              onToggleAction={toggleAction}
              onContinue={() => completeCheckpoint(actionConsumptionMap)}
            />
          </>
        );
      }

      case 'playback': {
        const checkpoint = checkpoints[flowState.checkpointNumber - 1];
        const selectedActions = checkpoint.actions.filter(action => 
          flowState.selectedActionIds.includes(action.id)
        );
        
        return (
          <>
            <TravelScene 
              backgroundImage={scenes[flowState.checkpointNumber - 1].backgroundImage}
              title={scenes[flowState.checkpointNumber - 1].title}
              description={scenes[flowState.checkpointNumber - 1].description}
            />
            <ActionPlayback
              checkpointNumber={flowState.checkpointNumber}
              selectedActions={selectedActions}
              onComplete={finishPlayback}
            />
          </>
        );
      }
      
      case 'transition': {
        const nextSegment = flowState.fromCheckpoint + 1;
        return (
          <TravelTransition 
            checkpointNumber={flowState.fromCheckpoint}
            isLastCheckpoint={nextSegment > 3}
          />
        );
      }

      case 'post-checkpoint-3-delay': {
        // Show checkpoint 3 scene during delay
        return (
          <TravelScene 
            backgroundImage={scenes[2].backgroundImage}
            title={scenes[2].title}
            description={scenes[2].description}
          />
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
        // Auto-advance through this state, no visible screen
        return (
          <TravelScene 
            backgroundImage={haltIssueScene.backgroundImage}
            title={haltIssueScene.title}
            description={haltIssueScene.description}
          />
        );
      }

      case 'traveling-to-destination': {
        // Show a brief transition screen while waiting for campfire
        return (
          <TravelScene 
            backgroundImage={campfireDestinationScene.backgroundImage}
            title="Arriving at Destination"
            description="Your campfire awaits..."
          />
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
