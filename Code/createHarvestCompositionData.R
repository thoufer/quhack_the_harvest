# Summarize last X yrs of harvest data by state and spp composition, top Y species hunted is output per state
#
# Input:
# taxa can be "All," "Ducks" or "Geese"
# last.yr = end year for calculation
# interval = number of years to sum/average
# top.n = number of "top harvested" species to output 

createHarvestCompositionData.fn <- function(inData=harvestData.out,select.taxa="ALL",last.yr=2016,interval=10,top.n=5) {
  
  # default is top 5 species harvested by state for 10 years from 2007-2016
  
  library(tidyverse)
  
  out <- inData %>% filter(year %in% c((last.yr-interval+1):last.yr)) # select years
 
  if (select.taxa %in% c("Ducks","Geese"))  {   # select taxa
    out <- out %>% filter(taxa == select.taxa)
  } 
  
  out <- out %>% group_by(state,species) %>%
    summarize(harvest = sum(harvestWgt)/interval) %>%
    mutate(propHarvest = harvest/sum(harvest)) %>%
    mutate(rank = rank(-propHarvest))

  out<-out[out$rank<(top.n+1),]
  out<-out[order(out$state,out$rank),]
} 
