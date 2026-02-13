import { useEffect } from 'react';
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
    continueToNextSegment,
    resolveIssue,
    arriveAtDestination,
    completeJourney,
    restart 
  } = useRVFlow();

  // Auto-trigger checkpoint arrival after traveling (60 seconds)
  useEffect(() => {
    if (flowState.type === 'traveling') {
      // Checkpoint will be triggered by TravelVideoScene after 60 seconds
    }
  }, [flowState]);

  // Auto-continue after transition
  useEffect(() => {
    if (flowState.type === 'transition') {
      const timer = setTimeout(() => {
        continueToNextSegment();
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, [flowState, continueToNextSegment]);

  // Auto-arrive at destination after traveling-to-destination (60 seconds)
  useEffect(() => {
    if (flowState.type === 'traveling-to-destination') {
      // Will be triggered by TravelVideoScene after 60 seconds
    }
  }, [flowState]);

  const renderContent = () => {
    switch (flowState.type) {
      case 'start': {
        return <StartJourneyScreen onStart={startJourney} />;
      }

      case 'traveling': {
        const fallbackImage = scenes[flowState.segment - 1]?.backgroundImage || scenes[0].backgroundImage;
        return (
          <TravelVideoScene 
            onTravelTimeReached={() => startCheckpoint(flowState.segment)}
            travelDuration={60000}
            fallbackImage={fallbackImage}
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
              selectionLimitReached={flowState.selectionLimitReached}
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

      case 'traveling-to-destination': {
        return (
          <TravelVideoScene 
            onTravelTimeReached={arriveAtDestination}
            travelDuration={60000}
            fallbackImage={campfireDestinationScene.backgroundImage}
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
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-6 animate-fade-in">
                <h2 className="text-4xl font-bold text-white text-shadow-lg">
                  Welcome to Camp! 🏕️
                </h2>
                <p className="text-xl text-white/90 text-shadow">
                  Time to relax by the campfire
                </p>
                <button
                  onClick={completeJourney}
                  className="mt-8 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-warm"
                >
                  Continue
                </button>
              </div>
            </div>
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
