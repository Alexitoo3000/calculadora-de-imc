export enum ActivityLevel {
  SEDENTARY = 'Sedentario (poco o nada de ejercicio)',
  LIGHT = 'Ligero (ejercicio 1-3 días/semana)',
  MODERATE = 'Moderado (ejercicio 3-5 días/semana)',
  ACTIVE = 'Activo (ejercicio 6-7 días/semana)',
  VERY_ACTIVE = 'Muy Activo (trabajo físico o ejercicio intenso)'
}

export enum Gender {
  MALE = 'Masculino',
  FEMALE = 'Femenino'
}

export enum Goal {
  MAINTAIN = 'Mantener peso',
  LOSE_MILD = 'Bajar peso (lento)',
  LOSE_NORMAL = 'Bajar peso (moderado)',
  LOSE_EXTREME = 'Bajar peso (rápido)'
}

export interface UserProfile {
  age: number;
  gender: Gender;
  height: number; // cm
  weight: number; // kg
  activity: ActivityLevel;
  goal: Goal;
  tdee: number; // Total Daily Energy Expenditure
  targetCalories: number;
}

export interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  description: string;
  timestamp: number; // milliseconds
  imageUrl?: string;
}

export interface AIAnalysisResult {
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  description: string;
  isFood: boolean;
}