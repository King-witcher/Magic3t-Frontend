import { useServiceStatus } from '@/contexts/ServiceStatusContext'
import { useRankInfo } from '@/hooks/useRanks'
import { UserData } from '@/models/users/User'
import {
  Avatar,
  Center,
  Flex,
  Text,
  VStack,
  Image,
  Tooltip,
  Badge,
  Box,
  Divider,
  Stack,
} from '@chakra-ui/react'
import { useMemo } from 'react'

interface Props {
  user: UserData
}

const tierMap = {
  Unranked: 'Indefinido',
  Bronze: 'Bronze',
  Silver: 'Prata',
  Gold: 'Ouro',
  Diamond: 'Diamante',
  Elite: 'Elite',
}

const divisionMap = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
}

export default function ProfileTab({ user }: Props) {
  const { getRankInfo } = useRankInfo()

  const matches = user.stats.wins + user.stats.draws + user.stats.defeats

  const rinfo = useMemo(() => getRankInfo(user.glicko), [user])

  return (
    <Center h="100%">
      <VStack
        gap="px"
        h="100%"
        w={{
          base: '100%',
          md: '400px',
        }}
        justifyContent="center"
      >
        <VStack gap="0px" flex="1" justifyContent="center">
          <Avatar
            src={user.photoURL || undefined}
            size={'xl'}
            rounded="20px"
            borderWidth="6px"
            borderColor={rinfo.colorScheme.darker}
            overflow="hidden"
            _before={{
              content: '""',
              inset: 0,
              pos: 'absolute',
            }}
            sx={{
              '--bg': rinfo ? 'colors.' + rinfo.colorScheme.lighter : 'white',
              '& img': {
                rounded: '14px',
                bg: 'linear-gradient(white, var(--bg))',
              },
            }}
          />
          <Flex alignItems="center" gap="8px">
            {user.role === 'bot' && (
              <Badge rounded="5px" fontSize="14px" bg="gray.200">
                Bot
              </Badge>
            )}
            <Text fontSize="30px">{user.nickname}</Text>
          </Flex>
          <Flex alignItems="center" userSelect="none" gap="5px">
            <Text
              color={rinfo.colorScheme.darker}
              fontSize="18px"
              fontWeight="700"
            >{`${tierMap[rinfo.tier]} ${
              rinfo.tier === 'Elite' || rinfo.tier === 'Unranked'
                ? ''
                : divisionMap[rinfo.division]
            }`}</Text>
            <Image
              ml="3px"
              src={rinfo?.thumbnail}
              alt="rank"
              draggable={false}
              w="32px"
            />
            <Text fontSize="16px" fontWeight="700" color="gray.600">
              {
                <>
                  {rinfo?.rating}
                  {rinfo?.precise && '!'}
                  {!rinfo?.reliable && '?'} SR
                </>
              }
            </Text>
            <Text fontSize="12px" fontWeight="500" color="gray.600">
              ±{rinfo?.deviation}
            </Text>
          </Flex>
        </VStack>

        <Divider />

        <VStack gap="px" flex="1" justifyContent="center">
          <Text fontSize="18px">{matches} partidas jogadas</Text>
          {matches && (
            <>
              <Flex
                w="300px"
                h="6px"
                rounded="999px"
                overflow="hidden"
                gap="1px"
                color="white"
                fontSize="16px"
              >
                <Center
                  bg="red.400"
                  h="full"
                  flex={user.stats.defeats / matches}
                />
                <Center
                  bg="gray.400"
                  h="full"
                  flex={user.stats.draws / matches}
                  overflow="hidden"
                />
                <Center
                  bg="green.400"
                  h="full"
                  overflow="hidden"
                  flex={user.stats.wins / matches}
                />
              </Flex>
              <Flex gap="10px">
                <Text fontWeight="500" color="red.400">
                  {Math.round((100 * user.stats.defeats) / matches)}%
                </Text>
                <Text fontWeight="500" color="gray.500">
                  {Math.round((100 * user.stats.draws) / matches)}%
                </Text>
                <Text fontWeight="500" color="green.400">
                  {Math.round((100 * user.stats.wins) / matches)}%
                </Text>
              </Flex>
            </>
          )}
        </VStack>
      </VStack>
    </Center>
  )
}
