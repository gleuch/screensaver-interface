import React, { useEffect, useState } from 'react'
import { Layout, Navbar } from '../../components'
import { useRouter } from 'next/router'
import ItemDetailView from './ItemDetailView'
import axios from 'axios'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { GALLERY_ABI } from '../../constants/gallery'
import { getNetworkLibrary } from '../../connectors'
import NFT from '../../types'

const ItemDetailPage: React.VFC = () => {
  // TODO: Pull item by slug from router

  // state : preview & not preview 

  const {
    chainId,
    account,
    activate,
    active,
    deactivate,
    library,
  } = useWeb3React<Web3Provider>()

  const router = useRouter()
  const { tokenId , preview } = router.query
  const [uri , setUri] = useState< undefined | string >()
  const [loading , setLoading] = useState< boolean >(true)
  const [metadata , setMetadata] = useState< NFT | undefined >()

  async function getMetadata() {
    var meta = await axios.get(uri)
    console.log(meta)
    var tempMetadata = meta.data
    tempMetadata.creationDate = new Date(meta.data.creationDate).toString()
    setMetadata(tempMetadata)
  }

  async function getUri() {
    const contract = new ethers.Contract(    
      process.env.NEXT_PUBLIC_CONTRACT_ID,
      GALLERY_ABI,
      getNetworkLibrary()
    )
    var tokenUri = await contract.tokenURI(tokenId)
    setUri(tokenUri)
  }

  useEffect(() => {
    if (!uri) return;
    console.log(uri)
    getMetadata()
  }, [uri])

  useEffect(() => {
    console.log(metadata)
    if (!metadata) return;
    console.log("METADATA", metadata)
    setLoading(false)
  }, [metadata])

  useEffect(() => {

    if (!tokenId) return;

    if (!!preview) {
      // add footer 
      setUri("https://ipfs.io/ipfs/" + preview.toString())
    } else {
      console.log("HERE")
      getUri()
    }

  }, [])

  if (loading) return <Layout><div className={'md:mt-12 pb-8 max-w-xl mx-auto'}>Loading...</div></Layout>
  
  return (
    <Layout>
      <div className={'md:mt-12 pb-8 w-11/12 mx-auto'}>
        <div
          className={
            'md:p-3 md:border md:border-solid md:border-gray-700 md:rounded max-w-xl mx-auto'
          }
        >
          <ItemDetailView userIsAuthenticated itemListingState={'past'} metadata={metadata} preview={!!preview} hash={preview?.toString()}/>
        </div>
      </div>
    </Layout>
  )
}

export default ItemDetailPage