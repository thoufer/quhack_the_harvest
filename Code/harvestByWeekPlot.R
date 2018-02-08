# Code to create date barcharts 
#
# 11-Dec-2017 E Silverman
#

# Remove dates = 0, and all years but last "interval"

# data is the data frame containing the PCS data with year, month, and day fields (harvestData.out)
# sp is a selected species OR Ducks or Geese  ... 
# title of figure
# interval = number of years to average
# st = state or states selected ... st can also specify region: NE, SE, NW, SW for four quadrat division of CONUS

harvestByWeek.plt <- function(data,st="MI",sp="Ducks",title="",interval=10,plotInNewWindow=TRUE) {

  library(tidyverse)
  library(lubridate)
  
  if (st=="NW") {
    st<-c("WA","OR","ID","MT","WY","ND","SD","NE","IA","MN")
  } else {
    if (st=="SW") {
      st<-c("CA","NV","UT","AZ","CO","NM","KS","OK","TX","MO","AR","LA")
    } else {if (st=="NE") {
      st<-c("WI","IL","IN","MI","OH","WV","PA","NY","MD","DE","NJ","CT","RI","MA","VT","NH","ME")
    } else {if (st=="SE") {
      st<-c("KY","VA","TN","NC","MI","AL","GA","SC","FL","DC")
      }}} 
    }
  
  if (!(sp %in% unique(data$species)) & !(sp %in% c("Ducks","Geese"))) {
        cat("incorrect species code! \n\n") 
  } else {

    # week color code data frame:
    #week.mo<-data.frame(week=c(35:65),week.mo=c(rep("S",5),"SO",rep("O",3),"ON",rep("N",3),"ND",rep("D",4),"DJ",rep("J",3),"JF",rep("F",3),"FM",rep("M",4)))
    week.mo<-data.frame(week=c(35:65),week.mo=factor(c(rep("S",5),rep("O",5),rep("N",4),rep("D",4),rep("J",4),rep("F",4),rep("M",5)),levels=c("S","O","N","D","J","F","M")))
  
    if ("Ducks" %in% sp | "Geese" %in% sp) {
      harvestDatePlot<- data %>% filter(taxa %in% sp) 
      } else {
        harvestDatePlot <- data %>% filter(species %in% sp)
        }
    
    harvestDatePlot <- harvestDatePlot %>% filter(state %in% st & year > (max(year)-interval) & month != 0 & day != 0) %>%
                    mutate(yr = ifelse(month < 13,year,year+1)) %>%
                    mutate(mo = ifelse(month < 13,month,month-12)) %>%
                    mutate(week = week(ymd(paste(yr,
                                        ifelse(mo < 10,paste("0",mo,sep=""),mo),
                                        ifelse(day < 10,paste("0",day,sep=""),day),sep="")))) %>%
       # make 12-30 week 52 and 12-31 week 53 for two 8 day weeks v. one 9 day week                    
                    mutate(week = ifelse(month==12 & day==30,52,week)) %>% 
                    mutate(wday = wday(ymd(paste(yr,
                                        ifelse(mo < 10,paste("0",mo,sep=""),mo),
                                        ifelse(day < 10,paste("0",day,sep=""),day),sep="")))) %>%
                    mutate(week = ifelse(week < 35, week + 52, week)) %>%
                    left_join(week.mo)

     
   if (plotInNewWindow) windows()
   harvestDatePlot %>% group_by(week, week.mo) %>%
     summarize(harvest = sum(harvestWgt)) %>%
      ggplot(mapping = aes(x=week,y=harvest/sum(harvest), fill= week.mo)) +
       geom_bar(stat = "identity", color="grey") +
        ggtitle(title) +
        theme(axis.ticks = element_blank(), axis.text.x = element_text(hjust = 0)) +
        scale_fill_brewer(palette = "Blues",direction=-1,guide=FALSE) +
        scale_x_continuous(breaks=c(35,40,45,49,53,57,61),labels=c("September","October","November","December","January","Febuary","March"),limits=c(35,65)) +
        labs(y = "Proportion of annual harvest", x = "Week in hunting season")
  
  }
}


 