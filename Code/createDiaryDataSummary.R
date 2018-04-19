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
     summarise(duckBagPH = mean(Duck_BPH), duckHunters = mean(DuckHunters),
               gooseBagPH = mean(Goose_BPH), gooseHunters = mean(GooseHunters),
               duckDaysAfieldPH= mean(DuckDays/DuckHunters), gooseDaysAfieldPH= mean(GooseDays/GooseHunters)) %>% 
     mutate(name = state.name[match(out$St,state.abb)], duck_bag = round(duckBagPH), duck_hunters = (100*round(duckHunters/100)), 
            goose_bag = round(gooseBagPH), goose_hunters = (100*round(gooseHunters/100)), 
            duck_daysAfield = round(duckDaysAfieldPH), goose_daysAfield = round(gooseDaysAfieldPH)) %>%
    select(name, St, duck_bag, duck_hunters, duck_daysAfield, goose_bag, goose_hunters, goose_daysAfield)
  
  names(out)[2]<-"abbrev"
  
  out
}