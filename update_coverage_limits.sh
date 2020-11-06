#! /bin/bash
declare -a bash_limits

access_token=$(curl -s -X POST -u "${OAUTH_CLIENT_ID}:${OAUTH_CLIENT_SECRET}" https://bitbucket.org/site/oauth2/access_token -d grant_type=client_credentials -d scopes="repository:write"| jq --raw-output '.access_token')

get_coverage_limits_from_file() {
  # create an array from the percentage value from each object contained within totals property
  json_limits=$(cat ./coverage/bf-ui-lib/coverage-summary.json | jq -r '[.total[].pct]')
  convert_jq_array_to_bash
}

convert_jq_array_to_bash() {
  # iterate over the jq array and add an item to the bash array
  for limit in $(echo "$json_limits" | jq -r '.[]');
  do
    bash_limits+=(`node -e "console.log(Math.floor($limit))"`)
  done
}

# calls the bitbucket api to update the provided environment variables
update_bitbucket_env_vars() {
  variable_key=$1
  variable_value=$2
  variable_uuid=$3

  if [ -z "$access_token" ]
  then
    echo "Could not make a request without access token"
  else
    echo "Updating the variables $variable_key"

    reqUrl="https://api.bitbucket.org/2.0/repositories/bluefacedevs/bf-ui-lib/pipelines_config/variables/$variable_uuid"
    response=$(curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer $access_token" -d "{\"uuid\": \"$variable_uuid\", \"key\": \"$variable_key\", \"value\": \"$variable_value\", \"secured\": \"false\"}" "$reqUrl")

    echo "Result: $response"
  fi
}

get_coverage_limits_from_file

# to get UUID values go to the repoistory variable page and on bitbucket and inspect the network calls
update_bitbucket_env_vars "COVERAGE_LIMIT_LINES" ${bash_limits[0]} "%7B1eea3706-4e21-4c8d-bdfd-8a67ad399801%7D"
update_bitbucket_env_vars "COVERAGE_LIMIT_STATEMENTS" ${bash_limits[1]} "%7B9dfe9bbd-2739-4ec5-8e12-79d016a2faf9%7D"
update_bitbucket_env_vars "COVERAGE_LIMIT_FUNCTIONS" ${bash_limits[2]} "%7B869d33c3-588f-4098-b76b-743d9b5fec31%7D"
update_bitbucket_env_vars "COVERAGE_LIMIT_BRANCHES" ${bash_limits[3]} "%7B7c493198-2c9d-4535-94b6-d0c54d639895%7D"
