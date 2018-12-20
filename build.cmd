rm -rf ./dist
mkdir -p dist

C:\"Program Files"\Git\usr\bin\zip -r -q dist/lambda.zip ./ -x ./*\.sh ./.git/**\* ./dist ./spec ./provisioning ./.idea > output.txt
