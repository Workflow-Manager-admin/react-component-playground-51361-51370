#!/bin/bash
cd /home/kavia/workspace/code-generation/react-component-playground-51361-51370/frontend_react_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

