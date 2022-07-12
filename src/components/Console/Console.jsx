// @flow

import React, { Component } from "react"
import GraphiQL from "graphiql"
import GraphiQLExplorer from "graphiql-explorer"
import { parse, buildClientSchema, getIntrospectionQuery } from "graphql"
import { createGraphiQLFetcher } from '@graphiql/toolkit';

import {
    makeDefaultArg,
    getDefaultScalarArgValue,
} from "../../services/CustomArgs"

import "graphiql/graphiql.css"
import "./Console.css"

const fetcher = createGraphiQLFetcher({
    url: 'https://starknet-archive.hasura.app/v1/graphql',
    subscriptionUrl: 'wss://starknet-archive.hasura.app/v1/graphql',
});


function getData(params) {
    return fetch("https://starknet-archive.hasura.app/v1/graphql", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    })
        .then(function(response) {
            return response.text()
        })
        .then(function(responseBody) {
            try {
                return JSON.parse(responseBody)
            } catch (e) {
                return responseBody
            }
        })
}

const DEFAULT_QUERY = `

## Quick start

# shift-option/alt-click on a query below to jump to it in the explorer
# option/alt-click on a field in the explorer to select all subfields

#You can combine queries to return all the data you're looking for in one
#shot. This example query requests three \`Mint\` events and all \`DEPLOY\`
#transactions together with their inputs in block 100000.
#
#You can get results directly from our http endpoint.
#curl https://starknet-archive.hasura.app/v1/graphql --data-raw '{"query":"query mint_and_deploy_100000 { event(where: {name: {_eq: \\"Mint\\"}, transmitter_contract: {_eq: \\"0x4b05cce270364e2e4bf65bde3e9429b50c97ea3443b133442f838045f41e733\\"}}, limit: 3) { name arguments { name type value decimal } transaction_hash } block(where: {block_number: {_eq: 100000}}) { transactions(where: {type: {_eq: \\"DEPLOY\\"}}) { function entry_point_selector inputs { name type value } } }}"}'

query mint_and_deploy_100000 {
  event(where: {name: {_eq: "Mint"}, transmitter_contract: {_eq: "0x4b05cce270364e2e4bf65bde3e9429b50c97ea3443b133442f838045f41e733"}}, limit: 3) {
    name
    arguments {
      name
      type
      value
      decimal
    }
    transaction_hash
  }
  block(where: {block_number: {_eq: 100000}}) {
    transactions(where: {type: {_eq: "DEPLOY"}}) {
      function
      entry_point_selector
      inputs {
        name
        type
        value
      }
    }
  }
}

## Input and event data decoded as per contract ABI

#Take a look at the transactions and events of block 100000 parsed and
#decoded. Try this query (which omits most fields for brevity).
query block_100000 {
  block(where: {block_number: {_eq: 100000}}) {
    transactions {
      function
      entry_point_selector
      inputs {
        name
        type
        value
      }
      events {
        name
        transmitter_contract
        arguments {
          name
          type
          value
          decimal
        }
      }
    }
  }
}

#Let's get the raw undecoded block for comparison.
#
#Try this http call with queries for both the decoded and the raw block 100000.
#curl https://starknet-archive.hasura.app/v1/graphql --data-raw '{"query":"{ block(where: {block_number: {_eq: 100000}}) { transactions { function entry_point_selector inputs { name type value } events { name transmitter_contract arguments { name type value decimal } } } } raw_block_by_pk(block_number: 100000) { raw }}"}'
query raw_block_100000 {
  raw_block_by_pk(block_number: 100000) {
    raw
  }
}

## Query for your contract's events

#You are probably interested not in whole blocks but in events emitted by
#your own contract. Let's narrow down with this query for \`Mint\` events
#of contract
#\`0x4b05cce270364e2e4bf65bde3e9429b50c97ea3443b133442f838045f41e733\`,
#limited to one result for brevity.
#
# Request all \`Mint\` events with this http call.
#curl https://starknet-archive.hasura.app/v1/graphql --data-raw '{"query":"query { event(where: {name: {_eq: \\"Mint\\"}, transmitter_contract: {_eq: \\"0x4b05cce270364e2e4bf65bde3e9429b50c97ea3443b133442f838045f41e733\\"}}) { name arguments { name type value decimal } transaction_hash }}"}'

query mint {
  event(where: {name: {_eq: "Mint"}, transmitter_contract: {_eq: "0x4b05cce270364e2e4bf65bde3e9429b50c97ea3443b133442f838045f41e733"}}, limit: 1) {
    name
    arguments {
      name
      type
      value
      decimal
    }
    transaction_hash
  }
}

## Query for values in JSON payloads

#Query for this transaction input \`index_and_x\` defined as a struct.
query index_and_x {
  input(where: {name: {_eq: "index_and_x"}, transaction: {contract_address: {_eq: "0x579f32b8090d8d789d4b907a8935a75f6de583c9d60893586e24a83d173b6d5"}}}, limit: 1) {
    value
  }
}

#This query digs into json by specifying the path to the second half of
#the tuple stored in the \`values\` field.
query index_and_x_y {
  input(where: {name: {_eq: "index_and_x"}, transaction: {contract_address: {_eq: "0x579f32b8090d8d789d4b907a8935a75f6de583c9d60893586e24a83d173b6d5"}}}, limit: 1) {
    value(path: "values[1]")
  }
}

#For illustration, try this query to see our contract's ABI.
query raw_abi {
  raw_abi_by_pk(contract_address: "0x579f32b8090d8d789d4b907a8935a75f6de583c9d60893586e24a83d173b6d5") {
    raw(path: "[0]")
  }
}

## Handling proxy contracts

#This query requests three transactions sent to a proxy contract
#\`0x47495c732aa419dfecb43a2a78b4df926fddb251c7de0e88eab90d8a0399cd8\`. You
#see the first \`DEPLOY\` transaction setting the implementation contract
#address to
#\`0x90aa7a9203bff78bfb24f0753c180a33d4bad95b1f4f510b36b00993815704\`.
#Let's add to the query a call to \`raw_abi\` to get ABIs for both proxy
#and implementation contracts, for demonstration.
query proxy {
  transaction(limit: 3, where: {contract_address: {_eq: "0x47495c732aa419dfecb43a2a78b4df926fddb251c7de0e88eab90d8a0399cd8"}}) {
    inputs {
      type
      value
      name
    }
    function
  }
  raw_abi(where: {contract_address: {_in: ["0x47495c732aa419dfecb43a2a78b4df926fddb251c7de0e88eab90d8a0399cd8", "0x90aa7a9203bff78bfb24f0753c180a33d4bad95b1f4f510b36b00993815704"]}}) {
    contract_address
    raw
  }
}

## Aggregation queries

# One approach is to query for all of the values of \`amount0\`.
query mint_amount0 {
  argument(where: {name: {_eq: "amount0"}, event: {name: {_eq: "Mint"}, transmitter_contract: {_eq: "0x4b05cce270364e2e4bf65bde3e9429b50c97ea3443b133442f838045f41e733"}}}, limit: 10) {
    type
    value
    name
    decimal
  }
}

#This query aggregates decimal values of \`amount0\` arguments of all
#\`Mint\` events.
query TVL {
  argument_aggregate(where: {name: {_eq: "amount0"}, event: {name: {_eq: "Mint"}, transmitter_contract: {_eq: "0x4b05cce270364e2e4bf65bde3e9429b50c97ea3443b133442f838045f41e733"}}}) {
    aggregate {
      sum {
        decimal
      }
      avg {
        decimal
      }
      min {
        decimal
      }
      max {
        decimal
      }
    }
  }
}

## Complex queries from database views

#This query calls a custom database view \`daily_mint\`.
query daily_mint {
  daily_mint(limit: 3) {
    amount0
    dt
  }
}

#Here's another example query that calculates total transactions per day.
#
#Request all daily transaction counts to date:
#curl https://starknet-archive.hasura.app/v1/graphql --data-raw '{"query":"query {daily_transactions {count date}}"}'
query daily_transactions {
  daily_transactions(limit: 3) {
    count
    date
  }
}

#Try this GraphQL query selecting from \`top_functions\` database view.
query top_functions {
  top_functions(limit: 4) {
    count
    name
  }
}


`

class Console extends Component {
    _graphiql
    state = { schema: null, query: DEFAULT_QUERY, explorerIsOpen: true }

    componentDidMount() {
        getData({
            query: getIntrospectionQuery(),
        }).then((result) => {
            const editor = this._graphiql.getQueryEditor()
            editor.setOption("extraKeys", {
                ...(editor.options.extraKeys || {}),
                "Shift-Alt-LeftClick": this._handleInspectOperation,
            })

            this.setState({ schema: buildClientSchema(result.data) })
        })
    }

    _handleInspectOperation = (cm, mousePos) => {
        const parsedQuery = parse(this.state.query || "")

        if (!parsedQuery) {
            console.error("Couldn't parse query document")
            return null
        }

        var token = cm.getTokenAt(mousePos)
        var start = { line: mousePos.line, ch: token.start }
        var end = { line: mousePos.line, ch: token.end }
        var relevantMousePos = {
            start: cm.indexFromPos(start),
            end: cm.indexFromPos(end),
        }

        var position = relevantMousePos

        var def = parsedQuery.definitions.find((definition) => {
            if (!definition.loc) {
                console.log("Missing location information for definition")
                return false
            }

            const { start, end } = definition.loc
            return start <= position.start && end >= position.end
        })

        if (!def) {
            console.error(
                "Unable to find definition corresponding to mouse position"
            )
            return null
        }

        var operationKind =
            def.kind === "OperationDefinition"
                ? def.operation
                : def.kind === "FragmentDefinition"
                ? "fragment"
                : "unknown"

        var operationName =
            def.kind === "OperationDefinition" && !!def.name
                ? def.name.value
                : def.kind === "FragmentDefinition" && !!def.name
                ? def.name.value
                : "unknown"

        var selector = `.graphiql-explorer-root #${operationKind}-${operationName}`

        var el = document.querySelector(selector)
        el && el.scrollIntoView()
    }

    _handleEditQuery = (query) => this.setState({ query })

    _handleToggleExplorer = () => {
        this.setState({ explorerIsOpen: !this.state.explorerIsOpen })
    }

    render() {
        const { query, schema } = this.state
        return (
            <div className="graphiql-container">
                <GraphiQLExplorer
                    schema={schema}
                    query={query}
                    onEdit={this._handleEditQuery}
                    onRunOperation={(operationName) =>
                        this._graphiql.handleRunQuery(operationName)
                    }
                    explorerIsOpen={this.state.explorerIsOpen}
                    onToggleExplorer={this._handleToggleExplorer}
                    getDefaultScalarArgValue={getDefaultScalarArgValue}
                    makeDefaultArg={makeDefaultArg}
                />
                <GraphiQL
                    ref={(ref) => (this._graphiql = ref)}
                    fetcher={fetcher}
                    schema={schema}
                    query={query}
                    onEditQuery={this._handleEditQuery}
                >
                    <GraphiQL.Toolbar>
                        <GraphiQL.Button
                            onClick={() => this._graphiql.handlePrettifyQuery()}
                            label="Prettify"
                            title="Prettify Query (Shift-Ctrl-P)"
                        />
                        <GraphiQL.Button
                            onClick={() => this._graphiql.handleToggleHistory()}
                            label="History"
                            title="Show History"
                        />
                        <GraphiQL.Button
                            onClick={this._handleToggleExplorer}
                            label="Explorer"
                            title="Toggle Explorer"
                        />
                        <GraphiQL.Button
                            onClick={this.props.handleSqlEditorVisible}
                            label="SQL Editor"
                            title="Show Editor"
                        />
                    </GraphiQL.Toolbar>
                </GraphiQL>
            </div>
        )
    }
}

export default Console
