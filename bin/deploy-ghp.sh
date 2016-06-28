#!/bin/bash

npm run-script build:prod
([[ -f "dist.tar.gz" ]] && rm "dist.tar.gz") || true
tar -czf "dist.tar.gz" dist/
