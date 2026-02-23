import { useState, useCallback } from 'react';

export type FlowState = 
  | { type: 'start' }
  | { type: 'traveling_video_1' }
  | { type: 'at_rest_point' }
  | { type: 'traveling_video_2' }
  | { type: 'journey_halt_issue' }
  | { type: 'night_road' }
  | { type: 'destination_arrived' }
  | { type: 'complete' };

export function useRVFlow() {
  const [flowState, setFlowState] = useState<FlowState>({ type: 'start' });

  const startJourney = useCallback(() => {
    setFlowState({ type: 'traveling_video_1' });
  }, []);

  const advanceToRestPoint = useCallback(() => {
    setFlowState({ type: 'at_rest_point' });
  }, []);

  const continueFromRestPoint = useCallback(() => {
    setFlowState({ type: 'traveling_video_2' });
  }, []);

  const showHaltIssue = useCallback(() => {
    setFlowState({ type: 'journey_halt_issue' });
  }, []);

  const resolveIssue = useCallback(() => {
    setFlowState({ type: 'night_road' });
  }, []);

  const viewNightRoad = useCallback(() => {
    setFlowState({ type: 'destination_arrived' });
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
    advanceToRestPoint,
    continueFromRestPoint,
    showHaltIssue,
    resolveIssue,
    viewNightRoad,
    completeJourney,
    restart
  };
}
