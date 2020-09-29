<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Setup act action](#setup-act-action)
  - [Inputs](#inputs)
    - [`version`](#version)
  - [Example usage](#example-usage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Setup act action

This action install [act](https://github.com/nektos/act)

> Modified from <https://github.com/actionsflow/actions-hugo>

## Inputs

### `version`

**Optional** The version of [act](https://github.com/nektos/act). Default `"latest"`.

## Example usage

```yaml
uses: actionsflow/setup-act@v1
with:
  version: '0.2.14'
```