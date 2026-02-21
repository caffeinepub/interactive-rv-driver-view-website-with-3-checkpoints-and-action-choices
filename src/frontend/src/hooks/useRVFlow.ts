import { useState, useCallback } from 'react';

export type FlowState = 
  | { type: 'start' }
  | { type: 'traveling'; segment: number }
  | { type: 'break-stop'; breakStopNumber: number }
  | { type: 'post-break-stop-delay' }
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
      
      // After the single break stop, go to post-break-stop-delay state
      return { type: 'post-break-stop-delay' };
    });
  }, []);

  const showHaltIssue = useCallback(() => {
    setFlowState((prev) => {
      // Only transition to halt-issue if we're in the delay state
      if (prev.type === 'post-break-stop-delay') {
        return { type: 'halt-issue' };
      }
      return prev;
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
    resolveIssue,
    proceedFromCelebration,
    arriveAtDestination,
    completeJourney,
    restart
  };
}
