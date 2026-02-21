import { useState, useCallback } from 'react';

export type FlowState = 
  | { type: 'start' }
  | { type: 'traveling'; segment: number }
  | { type: 'break-stop'; breakStopNumber: number }
  | { type: 'post-break-stop-delay' }
  | { type: 'post-break-road-to-issue' }
  | { type: 'halt-issue' }
  | { type: 'post-issue-road-to-destination' }
  | { type: 'celebration' }
  | { type: 'traveling-to-destination' }
  | { type: 'destination' }
  | { type: 'complete' };

export function useRVFlow() {
  const [flowState, setFlowState] = useState<FlowState>({ type: 'start' });

  const startJourney = useCallback(() => {
    setFlowState({ type: 'traveling', segment: 1 });
  }, []);

  const startBreakStop = useCallback((breakStopNumber: number) => {
    setFlowState({ 
      type: 'break-stop', 
      breakStopNumber
    });
  }, []);

  const continueFromBreakStop = useCallback(() => {
    setFlowState((prev) => {
      if (prev.type !== 'break-stop') return prev;
      
      // After the single break stop, go to post-break-stop-delay state
      return { type: 'post-break-stop-delay' };
    });
  }, []);

  const showPostBreakRoad = useCallback(() => {
    setFlowState({ type: 'post-break-road-to-issue' });
  }, []);

  const showHaltIssue = useCallback(() => {
    setFlowState({ type: 'halt-issue' });
  }, []);

  const resolveIssue = useCallback(() => {
    setFlowState({ type: 'celebration' });
  }, []);

  const proceedFromCelebration = useCallback(() => {
    setFlowState({ type: 'post-issue-road-to-destination' });
  }, []);

  const arriveAtDestination = useCallback(() => {
    setFlowState({ type: 'destination' });
  }, []);

  const completeJourney = useCallback(() => {
    setFlowState({ type: 'complete' });
  }, []);

  const restart = useCallback(() => {
    setFlowState({ type: 'start' });
  }, []);

  return {
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
  };
}
