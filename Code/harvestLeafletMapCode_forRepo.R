# This code creates a leaflet county map of harvestWgt percentiles for selected species and years

# 2-Nov-2017 E Silverman

library(tidyverse)
library(tidycensus)
library(leaflet)
library(stringr)
library(sf)
library(htmlwidgets)
library(shapefiles)

backup_options <- options() # so you can reset options if you write map to browser outside RStudio

#census_api_key(key="your key here",install=T) # you need to get and add your own key here (go to https://api.census.gov/data/key_signup.html)!

data(fips_codes) # this isn't really needed

# Read in county level census data (total human popn) and geometry
us_pop <- get_acs(geography = "county",  
                  variables = "B01003_001", 
                  geometry = TRUE,
                  cache_table = TRUE)

# Possible species:
# "ABDU" "AGWT" "AMWI" "ATBR" "BAGO" "BBWD" "BCTE" "BLBR" "BLSC" "BUFF" "CAGO" "CANV" "COEI" "COGO" "COME" "DOME" "EMGO" "EUWI" "FUWD" "GADW" "GRSC" "GWFG" "HARD" "HOME" "KIEI" "LESC" "LTDU" "MALL" "MBDH" "MEDU" "MIDU" "MIGO" "MIHY" "MODU" "MUSC" "NOPI" "NSHO" "RBME" "REDH" "RNDU" "ROGO" "RUDU" "SGBL" "SGWH" "STEI" "SUSC" "WODU" "WWSC"

selectSp<-c("WODU") # can do > 1 species ....
selectYr<-c(1990:2016)

harvest.co<- filter(harvestData.out, species %in% selectSp, year %in% selectYr) %>%
  group_by(FIPS) %>%
  summarise(
    wings = n(),
    harvest = sum(harvestWgt)
  ) %>%
  mutate(GEOID = as.character(FIPS)) %>% # for the join to us_pop
  mutate(GEOID = ifelse(nchar(GEOID)==4,paste("0",GEOID,sep=""),GEOID)) %>%
  mutate(avg_harvest = harvest/length(selectYr)) %>% 
  mutate(harvest.lab = ifelse(avg_harvest>1000,100,10)*(avg_harvest %/% ifelse(avg_harvest>1000,100,10))) %>% # This is creating a rounded value for the click on label
  select(GEOID, wings, avg_harvest,harvest.lab)

harvest.co<-us_pop %>% left_join(harvest.co) %>% replace_na(list(wings=0,avg_harvest=0,harvest.lab=0))

pal <- colorQuantile(palette = "Blues", domain = harvest.co$avg_harvest, probs=c(0,.5,.6,.7,.8,.9,1)) # sets color scheme


options(viewer = NULL) # This causes RStudio to open the map in a browser ....
harvest.co %>%
  st_transform(crs = "+init=epsg:4326") %>%
  leaflet(width = "100%") %>%
  addProviderTiles(provider = "CartoDB.Positron") %>%
  addPolygons(popup = ~ paste(str_extract(NAME, "^([^,]*)"),harvest.lab),
              stroke = FALSE,
              smoothFactor = 0,
              fillOpacity = 0.7,
              color = ~ pal(avg_harvest)) %>%
  addLegend("bottomright", 
            pal = pal, 
            values = ~ avg_harvest,
            title = "Percentiles: mean yearly harvest",
            opacity = 1)

#saveWidget(m,"woodduckAvgHarvestMap.html") ... assign code above starting at line 48 to object m to read out map to a file, comment out options (line 47)
