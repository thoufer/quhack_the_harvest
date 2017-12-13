# function to create a harvest percentiles data frame 
# E Silverman 13-Dec-2017
#
# select summarize by state or county (state or FIPS)
# select species or species groups or taxa (ALL = default, Ducks, Geese, or set of species codes)
# select time interval to average and years
# if multiple species are selected, do you want the percentiles by species (by.species = TRUE) 
# or for all selected species combined? (by.species = FALSE)
#
createHarvestMapData.fn <- function(sp="ALL",unit="state",last.yr=2016,interval=10, by.sp=FALSE) {

# default is all harvest by state for 10 years from 2007-2016, calculate percentiles all selected species combined
  
  library(tidyverse)
  
  out <- harvestData.out %>% filter(year %in% c((last.yr-interval+1):last.yr)) # select years
  
  if (sum(sp %in% c("Ducks","Geese")) == 1 & length(sp)==1) {                  # select species
    out <- out %>% filter(taxa == sp)
  } else {
      if (sum(sp != "ALL")>0) {
        if (sum(sp %in% unique(out$species))<length(sp)) {
          cat("Incorrect code for species! Output is for all species. \n\n")
          } else {
              out <-out %>% filter(species %in% sp)
            }
      }
  }
  
  if (unit != "state") {        # select all records with county FIPS codes (remove state only)
    if (unit != "FIPS") {
      cat("Unit is not coded 'state' or 'FIPS.' Output is for states. \n\n")
    } else {
      out <- out %>% filter((FIPS/1000 - trunc(FIPS/1000)) != 0)
      }
  }

  if (unit == "FIPS") {   # calculate average harvest by unit (and species if specified) over interval
    if (by.sp) {
      out <- out %>% group_by(FIPS,species) %>%
              summarize(harvest = sum(harvestWgt)/interval)
    } else {
        out <- out %>% group_by(FIPS) %>%
          summarize(harvest = sum(harvestWgt)/interval)
      }
  } else {
      if (by.sp) {
        out <- out %>% group_by(state,species) %>%
          summarize(harvest = sum(harvestWgt)/interval)
      } else {
        out <- out %>% group_by(state) %>%
          summarize(harvest = sum(harvestWgt)/interval)
        }
    }
  
  if (by.sp) {                               # calculate avg harvest percentile 
    out <- out %>% group_by(species) %>%
      mutate(hvstPercentile = rank(harvest)/(length(harvest)+1))
  } else {
      out <- out %>% mutate(hvstPercentile = rank(harvest)/(length(harvest)+1))
    }
  

  out
}

