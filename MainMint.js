import {useState} from 'react';
import { ethers, BigNumber } from 'ethers';
import { Box, Button, Flex, Input, Text} from "@chakra-ui/react";
import hongBao from './HongBao.json';

const hongBaoAddress = "0x62d2d6F58d35048a305D1Ca1a16630001f3eAAF9";

const MainMint = ({ accounts, setAccounts}) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                hongBaoAddress,
                hongBao.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.0015 * mintAmount).toString()),
                });
                console.log('response: ', response);
            } catch (err) {
                console.log("error: ", err)
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1 );

    };

    const handleIncrement = () => {
        if (mintAmount >= 10) return;
        setMintAmount(mintAmount + 1 );

    };

    return(
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="830px">
            <div>
           <Text fontSize="40px" textShadow="0 5px #000000">HongBao红包</Text> 
            <Text
                fontSize="30px"
                letterSpacing="-5.5%"
                fontFamily= "VT323"
                textShadow="0 2px 2px #000000"
                >

               
        Where could this mysterious red envelope leads to? Burn it all to find out. 
        There might be something hidden inside. Or do nothing about it.  Your choice.  
        </Text>
           </div>

           {isConnected ?(
            <div>
                <Flex align="center" justify="center">
                    <Button
                        backgroundColor="#D6517D"
                        borderRadius="5px"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="15px"
                        marginTop= "10px"
                        onClick={handleDecrement}

                        >
                            -
                        </Button>
                        <Input 
                            readOnly
                            fontFamily="inherit"
                            width="100px"
                            height = "40px"
                            textAlign="center"
                            paddingLeft="19px"
                            marginTop="10px"
                            type="number"
                            value={mintAmount}

                            />
                            <Button
                       

                        backgroundColor="#D6517D"
                        borderRadius="5px"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="15px"
                        marginTop= "10px"
                        onClick={handleIncrement}

                        >
                            +
                    </Button>
                </Flex>
                <Button
                     backgroundColor="#D6517D"
                        borderRadius="5px"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="15px"
                        marginTop= "10px"
                        onClick={handleMint}
                        
                >
                    MINT NOW
                </Button>
                </div>
           ) : (

                <Text 
                    marginTop ="70px"
                    fontSize ="30px"
                    letterSpacing="-5.5%"
                    fontFamily="VT323"
                    textShadow= "0 3px #000000"
                    color= "#D6517D"
                    >
                <p>Your wallet must be connected to Mint.</p>
                </Text>
           )}
           </Box>
        </Flex>
    );
};

export default MainMint;