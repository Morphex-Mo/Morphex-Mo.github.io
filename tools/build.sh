#!/usr/bin/env bash
#
# Build the site for deployment targets that only need the Jekyll output.

set -eu

export BUNDLE_WITHOUT="${BUNDLE_WITHOUT:-development:test}"

JEKYLL_ENV=production bundle exec jekyll build