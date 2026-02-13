import { useState, useCallback } from 'react';

export type FlowState = 
  | { type: 'start' }
  | { type: 'traveling'; segment: number }
  | { type: 'checkpoint'; checkpointNumber: number; selectedActions: Set<string>; selectionLimitReached: boolean }
  | { type: 'playback'; checkpointNumber: number; selectedActionIds: string[] }
  | { type: 'transition'; fromCheckpoint: number }
  | { type: 'halt-issue' }
  | { type: 'traveling-to-destination' }
  | { type: 'destination' }
  | { type: 'complete' };

export function useRVFlow() {
  const [flowState, setFlowState] = useState<FlowState>({ type: 'start' });
  const [internalResourceTotal, setInternalResourceTotal] = useState(0);

  const startJourney = useCallback(() => {
    setFlowState({ type: 'traveling', segment: 1 });
    setInternalResourceTotal(0);
  }, []);

  const startCheckpoint = useCallback((checkpointNumber: number) => {
    setFlowState({ 
      type: 'checkpoint', 
      checkpointNumber,
      selectedActions: new Set(),
      selectionLimitReached: false
    });
  }, []);

  const toggleAction = useCallback((actionId: string) => {
    setFlowState((prev) => {
      if (prev.type !== 'checkpoint') return prev;
      
      const newSelected = new Set(prev.selectedActions);
      if (newSelected.has(actionId)) {
        newSelected.delete(actionId);
        return {
          ...prev,
          selectedActions: newSelected,
          selectionLimitReached: false
        };
      } else {
        if (newSelected.size >= 2) {
          return {
            ...prev,
            selectionLimitReached: true
          };
        }
        newSelected.add(actionId);
        return {
          ...prev,
          selectedActions: newSelected,
          selectionLimitReached: false
        };
      }
    });
  }, []);

  const completeCheckpoint = useCallback((actionConsumptionMap: Record<string, number>) => {
    setFlowState((prev) => {
      if (prev.type !== 'checkpoint') return prev;
      
      const selectedActionIds = Array.from(prev.selectedActions);
      
      // Apply internal resource consumption
      let totalConsumption = 0;
      selectedActionIds.forEach(actionId => {
        totalConsumption += actionConsumptionMap[actionId] || 0;
      });
      setInternalResourceTotal(current => current + totalConsumption);
      
      return { 
        type: 'playback', 
        checkpointNumber: prev.checkpointNumber,
        selectedActionIds
      };
    });
  }, []);

  const finishPlayback = useCallback(() => {
    setFlowState((prev) => {
      if (prev.type !== 'playback') return prev;
      
      // After checkpoint 3, go to halt-issue state
      if (prev.checkpointNumber === 3) {
        return { type: 'halt-issue' };
      }
      
      return { type: 'transition', fromCheckpoint: prev.checkpointNumber };
    });
  }, []);

  const continueToNextSegment = useCallback(() => {
    setFlowState((prev) => {
      if (prev.type !== 'transition') return prev;
      
      const nextCheckpoint = prev.fromCheckpoint + 1;
      if (nextCheckpoint > 3) {
        return { type: 'complete' };
      }
      
      return { type: 'traveling', segment: nextCheckpoint };
    });
  }, []);

  const resolveIssue = useCallback(() => {
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
    setInternalResourceTotal(0);
  }, []);

  return {
    flowState,
    internalResourceTotal,
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
  };
}
