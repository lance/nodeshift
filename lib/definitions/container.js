/*
 *
 *  Copyright 2016-2017 Red Hat, Inc, and individual contributors.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

'use strict';

const _ = require('lodash');

// https://docs.openshift.com/online/rest_api/openshift_v1.html#v1-container

module.exports = (resource, config) => {
  if (!resource.spec.template.spec.containers) {
    resource.spec.template.spec.containers = [];
  }

  const container = {
    image: config.projectName,
    name: config.projectName,
    securityContext: {
      privileged: false
    }
  };

  const ports = [
    {
      containerPort: config.port,
      name: 'http',
      protocol: 'TCP'
    }
  ];

  // Not thrilled with this
  const currentContainer = resource.spec.template.spec.containers[0];

  const updatedContainer = _.merge(currentContainer, container, {ports: ports});

  // Probably don't need this
  resource.spec.template.spec.containers[0] = updatedContainer;

  return resource;
};
