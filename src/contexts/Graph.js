import React, { useState, createContext, useEffect } from 'react'
//The Graph
import { ApolloClient, InMemoryCache, useQuery } from '@apollo/client'
//Utils
import { reporterQuery, autopayQuery } from '../utils/queries'
import { decodingMiddleware, sortDataByProperty } from '../utils/helpers'

export const GraphContext = createContext()

//ApolloClients
const clientMainnet = new ApolloClient({
  uri: 'https://gateway.thegraph.com/api/ad08435a6d6c0933c9e272dbdfa21322/subgraphs/id/4mgMy9x1FC6kzjXSQisntEKJFT2U7r73qXMZy2XZ1t4R',
  cache: new InMemoryCache(),
})
const clientRinkeby = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/tellor-io/tellorxoraclerinkhgraph',
  cache: new InMemoryCache(),
})
const clientGoerli = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/raynharr/tellor-flex-goerli-graph',
  cache: new InMemoryCache(),
})
const clientMatic = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/tellor-io/tellorflexoraclematichgraph',
  cache: new InMemoryCache(),
})
const clientMumbai = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/tellor-io/tellorflexoraclemumbaihgraph',
  cache: new InMemoryCache(),
})
const clientArbone = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/raynharr/tellor-flex-arbitrummain-graph',
  cache: new InMemoryCache(),
})
const clientGnosismain = new ApolloClient({
  uri: 'https://gateway.thegraph.com/api/ad08435a6d6c0933c9e272dbdfa21322/subgraphs/id/A614VZr6wqD4B8wNwiZTqrV6StP1Kvmp2AgG2EdJF31k',
  cache: new InMemoryCache(),
})
const clientOptmain = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/tellor-io/tellor-oracle-optimism-main',
  cache: new InMemoryCache(),
})

const Graph = ({ children }) => {
  //Component State
  const [graphMainnetData, setGraphMainnetData] = useState({})
  const [graphRinkebyData, setGraphRinkebyData] = useState({})
  const [graphGoerliData, setGraphGoerliData] = useState({})
  const [graphMaticData, setGraphMaticData] = useState({})
  const [graphMumbaiData, setGraphMumbaiData] = useState({})
  const [graphArboneData, setGraphArboneData] = useState({})
  const [graphGnosismainData, setGraphGnosismainData] = useState({})
  const [graphOptmainData, setGraphOptmainData] = useState({})
  const [allGraphData, setAllGraphData] = useState(null)
  const [decodedData, setDecodedData] = useState(null)

  //Graph Querying every 5 seconds
  //Mainnet
  const mainnet = useQuery(reporterQuery, {
    client: clientMainnet,
    fetchPolicy: 'network-only',
    pollInterval: 5000,
  })
  const mainPay = useQuery(autopayQuery, {
    client: clientMainnet,
    fetchPolicy: 'network-only',
    pollInterval: 5000,
  })
  //Rinkeby
  const rinkeby = useQuery(reporterQuery, {
    client: clientRinkeby,
    fetchPolicy: 'network-only',
    pollInterval: 5000,
  })
   //Goerli
   const goerli = useQuery(reporterQuery, {
    client: clientGoerli,
    fetchPolicy: 'network-only',
    pollInterval: 5000,
  })
  const goerliPay = useQuery(autopayQuery, {
    client: clientGoerli,
    fetchPolicy: 'network-only',
    pollInterval: 5000,
  })
  //Matic
  const matic = useQuery(reporterQuery, {
    client: clientMatic,
    fetchPolicy: 'network-only',
    pollInterval: 5000,
  })
  //Mumbai
  const mumbai = useQuery(reporterQuery, {
    client: clientMumbai,
    fetchPolicy: 'network-only',
    pollInterval: 5000,
  })
  //Arbitrum One (Main)
  const arbone = useQuery(reporterQuery, {
    client: clientArbone,
    fetchPolicy: 'network-only',
    pollInterval: 5000,
  })
  //Gnosis Mainnet
  const gnosismain = useQuery(reporterQuery, {
    client: clientGnosismain,
    fetchPolicy: 'network-only',
    pollInterval: 5000,
  })
  //optimism(mainnet)
  const optmain = useQuery(reporterQuery, {
    client: clientOptmain,
    fetchPolicy: 'network-only',
    pollInterval: 5000,
  })

  //useEffects for listening to reponses
  //from ApolloClient queries
  //Mainnet
  useEffect(() => {
    if (!mainnet) return
    setGraphMainnetData({
      data: mainnet.data,
      loading: mainnet.loading,
      error: mainnet.error,
    })
    return () => {
      setGraphMainnetData({})
    }
  }, [mainnet.data, mainnet.loading, mainnet.error]) //eslint-disable-line
  //Rinkeby
  useEffect(() => {
    if (!rinkeby) return
    setGraphRinkebyData({
      data: rinkeby.data,
      loading: rinkeby.loading,
      error: rinkeby.error,
    })

    return () => {
      setGraphRinkebyData({})
    }
  }, [rinkeby.data, rinkeby.loading, rinkeby.error]) //eslint-disable-line
    //Goerli
    useEffect(() => {
      if (!goerli) return
      setGraphGoerliData({
        data: goerli.data,
        loading: goerli.loading,
        error: goerli.error,
      })
  
      return () => {
        setGraphGoerliData({})
      }
    }, [goerli.data, goerli.loading, goerli.error]) //eslint-disable-line
  //Matic
  useEffect(() => {
    if (!matic) return
    setGraphMaticData({
      data: matic.data,
      loading: matic.loading,
      error: matic.error,
    })

    return () => {
      setGraphMaticData({})
    }
  }, [matic.data, matic.loading, matic.error]) //eslint-disable-line
  //Mumbai
  useEffect(() => {
    if (!mumbai) return
    setGraphMumbaiData({
      data: mumbai.data,
      loading: mumbai.loading,
      error: mumbai.error,
    })

    return () => {
      setGraphMumbaiData({})
    }
  }, [mumbai.data, mumbai.loading, mumbai.error]) //eslint-disable-line
   //Arbitrum One
   useEffect(() => {
    if (!arbone) return
    setGraphArboneData({
      data: arbone.data,
      loading: arbone.loading,
      error: arbone.error,
    })

    return () => {
      setGraphArboneData({})
    }
  }, [arbone.data, arbone.loading, arbone.error]) //eslint-disable-line  
  //Gnosis Main
  useEffect(() => {
    if (!gnosismain) return
    setGraphGnosismainData({
      data: gnosismain.data,
      loading: gnosismain.loading,
      error: gnosismain.error,
    })

    return () => {
      setGraphGnosismainData({})
    }
  }, [gnosismain.data, gnosismain.loading, gnosismain.error]) //eslint-disable-line 
  //Optmain
  useEffect(() => {
    if (!optmain) return
    setGraphOptmainData({
      data: optmain.data,
      loading: optmain.loading,
      error: optmain.error,
    })

    return () => {
      setGraphOptmainData({})
    }
  }, [optmain.data, optmain.loading, optmain.error]) //eslint-disable-line

  //For conglomerating data
  useEffect(() => {
    if (
      !graphMainnetData.data ||
      !graphRinkebyData.data ||
      !graphGoerliData.data ||
      !graphMaticData.data ||
      !graphMumbaiData.data ||
      !graphArboneData.data ||
      !graphGnosismainData.data ||
      !graphOptmainData.data
    )
      return

    let eventsArray = []
    graphMainnetData.data.newReportEntities.forEach((event) => {
      event.chain = 'Ethereum Mainnet'
      event.txnLink = `https://etherscan.io/tx/${event.txnHash}`
      eventsArray.push(event)
    })
    graphGoerliData.data.newReportEntities.forEach((event) => {
      event.chain = 'Goerli Testnet'
      event.txnLink = `https://goerli.etherscan.io/tx/${event.txnHash}`
      eventsArray.push(event)
    })
    graphMaticData.data.newReportEntities.forEach((event) => {
      event.chain = 'Polygon Mainnet'
      event.txnLink = `https://polygonscan.com/tx/${event.txnHash}`
      eventsArray.push(event)
    })
    graphMumbaiData.data.newReportEntities.forEach((event) => {
      event.chain = 'Mumbai Testnet'
      event.txnLink = `https://mumbai.polygonscan.com/tx/${event.txnHash}`
      eventsArray.push(event)
    })
    graphArboneData.data.newReportEntities.forEach((event) => {
      event.chain = 'Arbitrum Mainnet'
      event.txnLink = `https://arbiscan.io/address/0x73b6715d9289bdfe5e758bb7ace782cc7c933cfc`
      eventsArray.push(event)
    })
    graphGnosismainData.data.newReportEntities.forEach((event) => {
      event.chain = 'Gnosis Mainnet'
      event.txnLink = `https://gnosisscan.io/tx/${event.txnHash}`
      eventsArray.push(event)
    })
    graphOptmainData.data.newReportEntities.forEach((event) => {
      event.chain = 'Optimism Mainnet'
      event.txnLink = `https://optimistic.etherscan.io/tx/${event.txnHash}`
      eventsArray.push(event)
    })
    let sorted = sortDataByProperty('_time', eventsArray)
    setAllGraphData(sorted)

    return () => {
      setAllGraphData(null)
    }
  }, [graphMainnetData, graphRinkebyData, graphGoerliData, graphMaticData, graphMumbaiData, graphArboneData, graphGnosismainData, graphOptmainData])

  useEffect(() => {
    if (!allGraphData) return
    setDecodedData(decodingMiddleware(allGraphData))

    return () => {
      setDecodedData(null)
    }
  }, [allGraphData])

  const GraphContextObj = {
    decodedData: decodedData,
  }

  // console.log('graphMainnetData', graphMainnetData)

  return (
    <GraphContext.Provider value={GraphContextObj}>
      {children}
    </GraphContext.Provider>
  )
}

export default Graph