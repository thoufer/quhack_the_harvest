# Pull and calculate hunter statistics by state
#
# 15-Mar-2018 E Silverman
#
hunterStats.fn<-function(tableName="dbo.DkGsEsts_ESilverman",interval=10) {
  
  library(RODBC)
  library(tidyverse)
  
  #Create a connection object to the database via ODBC
  hs <- odbcConnect("harvest_data")
  
  diaryData <- sqlFetch(hs,tableName)
  
  out<- diaryData %>% filter(Season > max(Season)-interval) %>%
    group_by(St) %>%
     summarise(duckBagPH = mean(Duck_BPH), duckHunters=mean(DuckHunters),
               gooseBagPH=mean(Goose_BPH), gooseHunters=mean(GooseHunters),
               # This is the days/hunter ducks and days/hunter geese weighted by number of hunters in each category
               daysAfieldPH= mean((DuckDays+GooseDays)/(DuckHunters+GooseHunters))) %>% 
     mutate(duckBagPH = round(duckBagPH), duckHunters=(100*round(duckHunters/100)), 
            gooseBagPH = round(gooseBagPH), gooseHunters=(100*round(gooseHunters/100)), 
            daysAfieldPH= round(daysAfieldPH))
  
}