import { User } from "@prisma/client";
import "next-auth";

export interface ICityData {
  img: string;
  location: string;
  province: string;
  id?: string;
}
export interface IInspiredCity {
  location: string;
  id: string;
}

export interface IStyleData {
  img: string;
  title: string;
}

export interface IProperty {
  propertyImage: {
    image: {
      url: string;
    };
  };
  destinationInfo: {
    distanceFromDestination: {
      value: number;
    };
  };
  mapMarker: {
    latLong: {
      latitude: number;
      longitude: number;
    };
  };
  id: string;
  name: string;
  neighborhood: {
    name: string;
  };
  reviews: {
    score: number;
  };
  price: {
    options: [
      {
        formattedDisplayPrice: string;
      }
    ];
    lead: {
      amount: number;
    };
  };
}

export interface IResult {
  hotelId: string;
  description: string;
  img: uploadImage[];
  lat: number;
  location?: number;
  long: number;
  price: string;
  star: number;
  title: string;
  total: number;
  userEmail?: string;
  startDate?: string;
  endDate?: string;
}

export interface IDetails {
  images: string[];
  amenities: string[];
  address: string;
}

export interface IOptions {
  method: string;
  headers: {
    "X-RapidAPI-Key": string;
    "X-RapidAPI-Host": string;
    "content-type"?: string;
  };
  body?: string;
}

export interface ISuggestion {
  regionNames: {
    shortName: string;
    displayName: string;
  };
  gaiaId: number;
  type: string;
}

export interface ISuggestionFormatted {
  shortName: string;
  displayName: string;
  id: number;
  type: string;
  img?: string;
  location?: string;
  province?: string;
}

export interface provider {
  name: string;
  id: string;
}

export interface IReservation {
  price_data: {
    currency: string;
    unit_amount: number;
    product_data: {
      name: string;
      description: string;
      images: string[];
    };
  };
  quantity: number;
}

export interface ILocation {
  lat: any;
  lng: any;
}
export interface uploadImage {
  publicId: string;
  url: string;
  status: string;
}

export interface ICity {
  id: string;
  cityName: string;
  publicId: string;
  url: string;
  status: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
}

export interface ITravelStyle {
  id: string;
  styleName: string;
  publicId: string;
  url: string;
  status: string;
}

export interface IDestination {
  startDate: string;
  endDate: string;
  hotelId: string | number | boolean | readonly string[] | readonly number[] | readonly boolean[] | null | undefined;
  total: string | number | boolean | readonly string[] | readonly number[] | readonly boolean[] | null | undefined;
  img: uploadImage[];
  id: string
  title: string
  description: string
  star: number
  lat: number
  location: string
  long: number
  price: float
  offer: boolean
  offerPrice: float
  status: string
  userEmail: string
  cityId: string
  createdAt: Date
}

export type IHotel = {
  [x: string]: any;
  img: uploadImage[];
  id: string
  title: string
  description: string
  star: number
  lat: number
  location: string
  long: number
  price: float
  offer: boolean
  offerPrice: float
  userEmail: string
  cityId: string
  createdAt: Date
  travelStyleId: string
}

export type IHotelSearch = {
  [x: string]: any;
  results: any[];
  id: string;
  title: string
  description: string
  star: number
  lat: number
  location: string
  long: number
  price: float
  offer: boolean
  offerPrice: float
  userEmail: string
  cityId: string
  createdAt: string
  travelStyleId: string
}

export type IExercise = {
  [x: string]: any;
  results: any[];
  id: string;

  exName: String;
  exDesc: String;
  exPic: String;
  exSteps: String[];
  exVideo: String;
  exDuration: String;
  status: String;
  // ExerciseCategory   ExerciseCategory? @relation(fields: [exerciseCategoryId], references: [id])
  exerciseCategoryId: String;          // @db.ObjectId
  // DailyPlan          DailyPlan?        @relation(fields: [dailyPlanId], references: [id])
  dailyPlanId: String;          // @db.ObjectId
  // TrainingProgram    TrainingProgram?  @relation(fields: [trainingProgramId], references: [id])
  trainingProgramId: String;
  reps: String;
  sets: String;
}

export type IDailyPlan = {
  [x: string]: any;
  results: any[];
  id: string;

  dpDay: String;
  dpTime: String;
  dpDuration: String;
  status: String;
  exerciseId: String;
  exercise: IExercise;

}

export type IProgramsCategory = {
  [x: string]: any;
  results: any[];
  id: string;
  pcName: string;
  pcDesc: string;
  image: string;
  status: string;
}

export type ITrainingProgram = {
  [x: string]: any;
  results: any[];
  id: string;

  trainingName: string;
  trainingDesc: string;
  trainingDay: string;
  trainingTime: string;
  traingDuration: string;
  trainingPeriod: string;
  status: string;
  trainer: IUser[];
  programsCategoryId: string;
  trainees: IUser;[]
  exercises: IExercise[];
}

export type IFoodPlanCategory = {
  [x: string]: any;
  results: any[];
  id: string;

  fpc_name: String;

}

export type IFoodPlan = {
  [x: string]: any;
  results: any[];
  id: string;

  dpDay: String;
  dpTime: String;
  dpDuration: String;
  status: String;
  fpc_id: String;
  exercise: IFoodPlanCategory;

}


export type IWaterIntake = {
  [x: string]: any;
  results: any[];
  id: string;
  wi_amount: String;
  wi_date: String;
  wi_time: String;
}


export type IExerciseActivity = {
  [x: string]: any;
  results: any[];
  id: string;
  exerciseId: string;
  exercise: IExercise;
  acDate: string;
  acTime: string;
  acDuration: string;
  acReps: string;
  acSets: string;
}


export type IExerciseCategory = {
  [x: string]: any;
  results: any[];
  id: string;
  excName: string;
  image: string;
  status: string;
}

export type IBpm = {
  [x: string]: any;
  results: any[];
  id: string;
  beats: string;
  bpmResult: string;
  date: string;
  userId: string
}

export type IBmi = {
  [x: string]: any;
  results: any[];
  id: string;
  height: string;
  weight: string;
  bmi: string;
  date: string
  userId: string;
}

export type ISleep = {
  [x: string]: any;
  results: any[];
  id: string;
  slDuration: string;
  slStartTime: string;
  slEndTime: string;
  slDate: string;
  status: string;
  userId: string;
  createdAt: string;
}

export type ISteps = {
  [x: string]: any;
  results: any[];
  id: string;
  stepsCount: string;
  duration: string;
  distanceCovered: string;
  date: string;
  userId

}