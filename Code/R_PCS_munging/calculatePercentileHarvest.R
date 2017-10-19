# Code to create data frame with spatial unit and percentile for total harvest
#
# spatial unit can be state or county
# time interval is specified (single year or cumulative set of years)
# species can be specified
#
calculatePercentileHarvest.fn <- function (unit="S", yrs=NULL, species=c("all")) {
  
  # unit = "S" state or two letter state abbreviation for county (FIPS) within state
  # yrs = vector of years
  # species = "all", "all.duck", "all.goose", or vector list
  
  if (species[1]=="all") {
    sp<-unique(harvestData.out$species)
  } else {
      if (species[1]=="all.duck") {
        sp<-unique(harvestData.out$species[harvestData.out$taxa=="Ducks"])
      } else {
          if (species[1]=="all.goose") {
            sp<-unique(harvestData.out$species[harvestData.out$taxa=="Geese"])
          } else {
            sp<-species
          }
        }
        
  }
  data<-harvestData.out[harvestData.out$year %in% yrs & harvestData.out$species %in% sp,]
  if (unit != "S") {
    data<-data[data$state %in% unit,]
  }
 if (unit=="S") {
   data.out<-aggregate(data$harvestWgt,list(state=data$state),sum)
 } else {
   data.out<-aggregate(data$harvestWgt,list(FIPS=data$FIPS),sum) 
   data.out<-data.out[substr(data.out$FIPS,nchar(data.out$FIPS)-2,nchar(data.out$FIPS))!="000",]
   }
 names(data.out)[2]<-"harvest"
 data.out<-data.out[order(data.out$harvest),]
 L<-nrow(data.out)
 data.out<-cbind(data.out,percentile=(c(0:(L-1))+.5)/L)
 data.out  
}