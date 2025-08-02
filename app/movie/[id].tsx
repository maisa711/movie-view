import { View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import useFetch from "@/hooks/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";

interface MovieInfoProps{
  label:string
  value?: string | number | null
}

const MovieInfo = ({label, value} : MovieInfoProps) => (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-zinc-200 font-normal text-sm">{label}</Text>
      <Text className="text-zinc-100 font-bold text-sm">{value || "N/A"}</Text>
    </View>
)

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const {
    data: movie,
    loading: movieLoading,
    error: movieError,
  } = useFetch(() => fetchMovieDetails(id.toString()));
  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {movieLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : movieError ? (
          <Text>Error: {movieError?.message}</Text>
        ) : (
          <>
          <View>
            <Image className="w-full h-[550px]" resizeMode="stretch" source={{uri: movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}` : "https://placehold.co/600x400/1a1a1a/ffffff.png"}}/>
          </View>

          <View className="flex-col items-start justify-center mt-5 px-5">
            <Text className="text-white font-bold text-xl">{movie?.title}</Text>
            <View className="flex-row items-center gap-x-1 mt-2">
              <Text className="text-zinc-300 text-sm">{movie?.release_date.split('-')[0]}</Text>
              <Text className="text-zinc-300 text-sm">{movie?.runtime}m</Text>
            </View>

            <View className="flex-row items-center px-2 py-1 rounded-md gap-x-1 mt-2 bg-zinc-700">
              <Image source={icons.star} className="size-4" />
              <Text className="text-white font-bold text-sm">{Math.round(movie?.vote_average ?? 0)}/10</Text>
              <Text className="text-white text-sm">({movie?.vote_count}) votes</Text>
            </View>

            <MovieInfo label="Overview" value={movie?.overview}/>
            <MovieInfo label="Genres" value={movie?.genres?.map((g) =>g.name).join(' - ') || "N/A"}/>
              <View className="flex flex-row justify-between w-1/2">
                <MovieInfo label="Budget" value={`$${(movie?.budget ?? 0) / 1_000_000} million`}/>
                <MovieInfo label="Revenue" value={`$${Math.round((movie?.revenue ?? 0) / 1_000_000)} million`}/>
              </View>
              <MovieInfo label="Production Companies" value={movie?.production_companies.map((c)=>c.name).join(' - ') || "N/A"}/>
          </View>

          
          
          </>
        )}
      </ScrollView>
      <TouchableOpacity onPress={router.back} className="absolute bottom-5 left-0 right-0 mx-5 bg-secondary-foreground rounded-lg py-3.5 flex flex-row items-center justify-center z-50">
        <Image className="size-5 mr-1 mt-0.5 rotate-180" tintColor={"#fff"} source={icons.arrow}/>
        <Text className="text-white font-semibold text-base">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
