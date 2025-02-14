/*
Copyright 2019-2021 The Tekton Authors
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { combineReducers } from 'redux';
import { labels as labelConstants } from '@tektoncd/dashboard-utils';

import clusterInterceptors, * as clusterInterceptorsSelectors from './clusterInterceptors';
import clusterTasks, * as clusterTaskSelectors from './clusterTasks';
import conditions, * as conditionSelectors from './conditions';
import extensions, * as extensionSelectors from './extensions';
import locale, * as localeSelectors from './locale';
import namespaces, * as namespaceSelectors from './namespaces';
import notifications, * as notificationSelectors from './notifications';
import pipelineResources, * as pipelineResourcesSelectors from './pipelineResources';
import pipelineRuns, * as pipelineRunsSelectors from './pipelineRuns';
import pipelines, * as pipelineSelectors from './pipelines';
import serviceAccounts, * as serviceAccountSelectors from './serviceAccounts';
import taskRuns, * as taskRunsSelectors from './taskRuns';
import tasks, * as taskSelectors from './tasks';

export default combineReducers({
  clusterInterceptors: clusterInterceptors(),
  clusterTasks,
  conditions: conditions(),
  extensions,
  locale,
  namespaces,
  notifications,
  pipelines: pipelines(),
  pipelineResources: pipelineResources(),
  pipelineRuns: pipelineRuns(),
  serviceAccounts: serviceAccounts(),
  tasks: tasks(),
  taskRuns: taskRuns()
});

function filterResources({ filters, resources }) {
  return resources.filter(resource =>
    filters.every(filter => {
      const [filterKey, filterValue] = filter.split('=');
      const { labels } = resource.metadata || resource;
      return (
        labels && filterKey && filterValue && labels[filterKey] === filterValue
      );
    })
  );
}

export function getSelectedNamespace(state) {
  return namespaceSelectors.getSelectedNamespace(state.namespaces);
}

export function getNamespaces(state) {
  return namespaceSelectors.getNamespaces(state.namespaces);
}

export function getServiceAccounts(
  state,
  { filters = [], namespace = getSelectedNamespace(state) } = {}
) {
  const resources = serviceAccountSelectors.getServiceAccounts(
    state.serviceAccounts,
    namespace
  );
  return filterResources({ filters, resources });
}

export function isFetchingServiceAccounts(state) {
  return serviceAccountSelectors.isFetchingServiceAccounts(
    state.serviceAccounts
  );
}

export function getServiceAccountsErrorMessage(state) {
  return serviceAccountSelectors.getServiceAccountsErrorMessage(
    state.serviceAccounts
  );
}

export function isFetchingNamespaces(state) {
  return namespaceSelectors.isFetchingNamespaces(state.namespaces);
}

export function getExtensions(state) {
  return extensionSelectors
    .getExtensions(state.extensions)
    .filter(({ displayName }) => !!displayName);
}

export function getExtensionsErrorMessage(state) {
  return extensionSelectors.getExtensionsErrorMessage(state.extensions);
}

export function isFetchingExtensions(state) {
  return extensionSelectors.isFetchingExtensions(state.extensions);
}

export function getPipeline(
  state,
  { name, namespace = getSelectedNamespace(state) }
) {
  return pipelineSelectors.getPipeline(state.pipelines, name, namespace);
}

export function getPipelines(
  state,
  { filters = [], namespace = getSelectedNamespace(state) } = {}
) {
  const resources = pipelineSelectors.getPipelines(state.pipelines, namespace);
  return filterResources({ filters, resources });
}

export function getPipelinesErrorMessage(state) {
  return pipelineSelectors.getPipelinesErrorMessage(state.pipelines);
}

export function isFetchingPipelines(state) {
  return pipelineSelectors.isFetchingPipelines(state.pipelines);
}

export function getPipelineResources(
  state,
  { filters = [], namespace = getSelectedNamespace(state) } = {}
) {
  const resources = pipelineResourcesSelectors.getPipelineResources(
    state.pipelineResources,
    namespace
  );
  return filterResources({ filters, resources });
}

export function getPipelineResource(
  state,
  { name, namespace = getSelectedNamespace(state) }
) {
  return pipelineResourcesSelectors.getPipelineResource(
    state.pipelineResources,
    name,
    namespace
  );
}

export function getPipelineResourcesErrorMessage(state) {
  return pipelineResourcesSelectors.getPipelineResourcesErrorMessage(
    state.pipelineResources
  );
}

export function isFetchingPipelineResources(state) {
  return pipelineResourcesSelectors.isFetchingPipelineResources(
    state.pipelineResources
  );
}

export function getPipelineRuns(
  state,
  { filters, namespace = getSelectedNamespace(state) } = {}
) {
  const resources = pipelineRunsSelectors.getPipelineRuns(
    state.pipelineRuns,
    namespace
  );
  return filterResources({ filters, resources });
}

export function getPipelineRun(
  state,
  { name, namespace = getSelectedNamespace(state) }
) {
  return pipelineRunsSelectors.getPipelineRun(
    state.pipelineRuns,
    name,
    namespace
  );
}

export function getPipelineRunsErrorMessage(state) {
  return pipelineRunsSelectors.getPipelineRunsErrorMessage(state.pipelineRuns);
}

export function isFetchingPipelineRuns(state) {
  return pipelineRunsSelectors.isFetchingPipelineRuns(state.pipelineRuns);
}

export function getTaskRun(
  state,
  { name, namespace = getSelectedNamespace(state) }
) {
  return taskRunsSelectors.getTaskRun(state.taskRuns, name, namespace);
}

export function getTaskRunsByPipelineRunName(
  state,
  pipelineRunName,
  { namespace = getSelectedNamespace(state) } = {}
) {
  const resources = taskRunsSelectors.getTaskRuns(state.taskRuns, namespace);
  return filterResources({
    filters: [`${labelConstants.PIPELINE_RUN}=${pipelineRunName}`],
    resources
  });
}

export function getTaskRuns(
  state,
  { filters, namespace = getSelectedNamespace(state) } = {}
) {
  const resources = taskRunsSelectors.getTaskRuns(state.taskRuns, namespace);
  return filterResources({ filters, resources });
}

export function getTaskRunsErrorMessage(state) {
  return taskRunsSelectors.getTaskRunsErrorMessage(state.taskRuns);
}

export function isFetchingTaskRuns(state) {
  return taskRunsSelectors.isFetchingTaskRuns(state.taskRuns);
}

export function getTasks(
  state,
  { filters = [], namespace = getSelectedNamespace(state) } = {}
) {
  const resources = taskSelectors.getTasks(state.tasks, namespace);
  return filterResources({ filters, resources });
}

export function getTask(
  state,
  { name, namespace = getSelectedNamespace(state) }
) {
  return taskSelectors.getTask(state.tasks, name, namespace);
}

export function getTasksErrorMessage(state) {
  return taskSelectors.getTasksErrorMessage(state.tasks);
}

export function isFetchingTasks(state) {
  return taskSelectors.isFetchingTasks(state.tasks);
}

export function getClusterTasks(state, { filters = [] } = {}) {
  const resources = clusterTaskSelectors.getClusterTasks(state.clusterTasks);
  return filterResources({ filters, resources });
}

export function getClusterTask(state, name) {
  return clusterTaskSelectors.getClusterTask(state.clusterTasks, name);
}

export function getClusterTasksErrorMessage(state) {
  return clusterTaskSelectors.getClusterTasksErrorMessage(state.clusterTasks);
}

export function isFetchingClusterTasks(state) {
  return clusterTaskSelectors.isFetchingClusterTasks(state.clusterTasks);
}

export function getTaskByType(
  state,
  { type, name, namespace = getSelectedNamespace(state) }
) {
  return type === 'clustertasks'
    ? getClusterTask(state, name)
    : getTask(state, { name, namespace });
}

export function getCondition(
  state,
  { name, namespace = getSelectedNamespace(state) }
) {
  return conditionSelectors.getCondition(state.conditions, name, namespace);
}

export function getConditions(
  state,
  { filters = [], namespace = getSelectedNamespace(state) } = {}
) {
  const resources = conditionSelectors.getConditions(
    state.conditions,
    namespace
  );
  return filterResources({ filters, resources });
}

export function getConditionsErrorMessage(state) {
  return conditionSelectors.getConditionsErrorMessage(state.conditions);
}

export function isFetchingConditions(state) {
  return conditionSelectors.isFetchingConditions(state.conditions);
}

export function getLocale(state) {
  return localeSelectors.getLocale(state.locale);
}

export function isWebSocketConnected(state) {
  return notificationSelectors.isWebSocketConnected(state.notifications);
}

export function getClusterInterceptors(state, { filters } = {}) {
  const resources = clusterInterceptorsSelectors.getClusterInterceptors(
    state.clusterInterceptors
  );
  return filterResources({ filters, resources });
}

export function getClusterInterceptor(state, { name }) {
  return clusterInterceptorsSelectors.getClusterInterceptor(
    state.clusterInterceptors,
    name
  );
}

export function getClusterInterceptorsErrorMessage(state) {
  return clusterInterceptorsSelectors.getClusterInterceptorsErrorMessage(
    state.clusterInterceptors
  );
}

export function isFetchingClusterInterceptors(state) {
  return clusterInterceptorsSelectors.isFetchingClusterInterceptors(
    state.clusterInterceptors
  );
}
