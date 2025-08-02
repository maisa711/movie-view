import { Text, TouchableOpacity, Image, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

import MaskedView from '@react-native-masked-view/masked-view';
import { images } from '@/constants/images';
interface TrendingMovieCardProps{
    movie: TrendingMovie;
    index: number
}

const TrendingMovieCard = ({
    movie,
    index
}: TrendingMovieCardProps) => {
  return (
    <Link href={{pathname: `/movie/[id]`, params: {id: movie?.movie_id}}} asChild>
        <TouchableOpacity className='w-32 relative pl-5'>
            <Image className='w-32 h-48 rounded-lg' resizeMode="cover" source={{uri: movie?.poster_url ? `https://image.tmdb.org/t/p/w500${movie?.poster_url}` : "https://placehold.co/600x400/1a1a1a/ffffff.png"}}/>
            
            
            <View className='absolute bottom-9 -left-3.5 px-2 py-1 rounded-full'>
                <MaskedView maskElement={<Text className='font-bold text-white text-6xl'>{index + 1}</Text>}>
                    <Image source={images.rankingGradient} className='size-14' resizeMode='cover'/>
                </MaskedView>
            </View>

            <Text className='text-sm font-bold text-white mt-2' numberOfLines={2}>{movie?.title}</Text>
        </TouchableOpacity>
    </Link>
  )
}

export default TrendingMovieCard