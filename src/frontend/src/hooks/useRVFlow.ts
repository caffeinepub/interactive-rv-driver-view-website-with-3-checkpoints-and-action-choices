import { useState, useCallback } from 'react';

export type FlowState = 
  | { type: 'start' }
  | { type: 'traveling'; segment: number }
  | { type: 'break-stop'; breakStopNumber: number }
  | { type: 'transition'; fromBreakStop: number }
  | { type: 'post-break-stop-3-delay' }
  | { type: 'halt-issue' }
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
      
      // After break stop 3, go to post-break-stop-3-delay state
      if (prev.breakStopNumber === 3) {
        return { type: 'post-break-stop-3-delay' };
      }
      
      return { type: 'transition', fromBreakStop: prev.breakStopNumber };
    });
  }, []);

  const showHaltIssue = useCallback(() => {
    setFlowState((prev) => {
      // Only transition to halt-issue if we're in the delay state
      if (prev.type === 'post-break-stop-3-delay') {
        return { type: 'halt-issue' };
      }
      return prev;
    });
  }, []);

  const continueToNextSegment = useCallback(() => {
    setFlowState((prev) => {
      if (prev.type !== 'transition') return prev;
      
      const nextBreakStop = prev.fromBreakStop + 1;
      if (nextBreakStop > 3) {
        return { type: 'complete' };
      }
      
      return { type: 'traveling', segment: nextBreakStop };
    });
  }, []);

  const resolveIssue = useCallback(() => {
    setFlowState({ type: 'celebration' });
  }, []);

  const proceedFromCelebration = useCallback(() => {
    setFlowState({ type: 'traveling-to-destination' });
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
    showHaltIssue,
    continueToNextSegment,
    resolveIssue,
    proceedFromCelebration,
    arriveAtDestination,
    completeJourney,
    restart
  };
}
