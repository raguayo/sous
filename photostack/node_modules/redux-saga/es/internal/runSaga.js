import { is, check } from './utils';
import proc from './proc';

export function runSaga(iterator, _ref) {
  var subscribe = _ref.subscribe;
  var dispatch = _ref.dispatch;
  var getState = _ref.getState;
  var sagaMonitor = _ref.sagaMonitor;
  var logger = _ref.logger;


  check(iterator, is.iterator, "runSaga must be called on an iterator");

  return proc(iterator, subscribe, dispatch, getState, { sagaMonitor: sagaMonitor, logger: logger });
}