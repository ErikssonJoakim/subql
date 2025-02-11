// Copyright 2020-2023 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: GPL-3.0

import {Context} from '../context';
import {Rule, RuleType} from './rule';

export class RequireValidManifest implements Rule {
  type = RuleType.Schema;
  name = 'require-valid-manifest';
  description = '`project.yaml` must match the schema';

  validate(ctx: Context): boolean {
    const schema = ctx.data.schema;

    try {
      schema.validate();
      return true;
    } catch (e) {
      ctx.logger.error(e.message);
      return false;
    }
  }
}
