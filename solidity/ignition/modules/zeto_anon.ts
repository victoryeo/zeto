// Copyright © 2024 Kaleido, Inc.
//
// SPDX-License-Identifier: Apache-2.0
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const VerifierModule = buildModule("Groth16Verifier_Anon", (m) => {
  const verifier = m.contract('Groth16Verifier_Anon', []);
  return { verifier };
});

export default buildModule("Zeto_Anon", (m) => {
  const { verifier } = m.useModule(VerifierModule);
  const commonlib = m.library('Commonlib');
  const registryAddress = m.getParameter("registry");
  const registry = m.contractAt('Registry', registryAddress);

  const zeto = m.contract('Zeto_Anon', [verifier, registry], {
    libraries: {
      Commonlib: commonlib,
    },
  });

  return { zeto };
});