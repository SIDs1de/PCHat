package config

import (
	"fmt"
	"github.com/joho/godotenv"
	"github.com/kelseyhightower/envconfig"
	"github.com/spf13/viper"
)

type Config struct {
	Host string `mapstructure:"host"`
	Port string `mapstructure:"port"`
	DB   *DB    `mapstructure:"db"`
}

type DB struct {
	DBMS        string    `mapstructure:"dbms"`
	StoragePath string    `mapstructure:"storage_path"`
	Postgres    *postgres `mapstructure:"postgres"`
}

type postgres struct {
	Host     string `envconfig:"HOST"`
	Port     string `envconfig:"PORT"`
	Username string `envconfig:"USERNAME"`
	Password string `envconfig:"PASSWORD"`
	DBName   string `envconfig:"DBNAME"`
	SSLMode  string `envconfig:"SSLMODE"`
}

func InitConfig() (*Config, error) {
	var cfg Config

	if err := loadEnvConfig(&cfg); err != nil {
		return nil, err
	}

	if err := loadYAMLConfig(&cfg); err != nil {
		return nil, err
	}

	return &cfg, nil
}

func loadEnvConfig(cfg *Config) error {
	err := godotenv.Load()
	if err != nil {
		return fmt.Errorf("Error loading .env file: %v", err)
	}

	cfg.DB = &DB{Postgres: &postgres{}}
	return envconfig.Process("POSTGRES", cfg.DB.Postgres)
}

func loadYAMLConfig(cfg *Config) error {
	viper.AddConfigPath("configs")
	viper.SetConfigName("config")

	if err := viper.ReadInConfig(); err != nil {
		return err
	}
	return viper.Unmarshal(cfg)
}
