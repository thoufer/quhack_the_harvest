Every year, harvest information for waterfowl is estimated using two related surveys:

The **Migratory Bird Hunter Survey** is a mail-in diary survey used to estimate total harvest of (i) ducks, (ii) geese, (iii) sea ducks, and (iv) brant.  This survey also determines the total number of active hunters and the number of days spent hunting.

The **Parts Collection, or Wing, Survey** is used to estimate the species, age, and sex composition of the harvest. Selected hunters send in a wing from each bird they shoot, and biologists determine the species, sex,and age of the bird based on wing feather color and wear.

The HarvestDataDucks.csv.gz file provided here includes records of waterfowl wings sent in to the Parts Collection Survey for waterfowl between 1967 and 2016.  Note: Due to file size limitations, only records for ducks are included.

The data set includes 11 variables:

1. year = the year the bird was harvested, 1967-2016

2. month = values are between 9 and 15 with 13, 14, 15 the codes for January, February, and March, as the year indicates the start of the hunting season (e.g., year = 1992 would include dates from Sept 1992 through Mar 1993). 0 indicates no month information available.
 
3. day = day of the month with 0 for cases with no day information available
 
4. FIPS = 4-5 digit Federal Information Processing Standards county code.  The first two digits indicate the state; the data set does not include leading 0, so some codes are 4 digits.
 
5. state = two letter state abbreviation

6. hunterNo = a number between 1 and 295,498 that identifies all individual hunters that have participated in the survey since 1967.  Hunters are selected to participate for up to three consecutive years.  If a hunter is selected anew for the survey, after the 3-year period, that hunter receives a new number, so hunters can not be tracked over repeated participation in the survey. 0 indicates cases where the hunter number is missing (12,739 cases). **NOTE:** There are an additional 23 records that represent harvest estimates in cases where harvest of, for example, sea ducks was reported for a state in the Hunter Survey, but no sea duck wings from that state came to the Parts Collection Survey.  These records are coded as hunterNumber = -1.  Month and day for these records is 0, and cohort is UU. Hunter numbers were randomly assigned for this exercise and are not in consecutive order.

7. species = four letter abbreviation for species

8. age  A = adult, I = immature, U = unknown

9. sex (M = male, F = female, U = unknown)

10. harvestWgt = the number of harvest birds represented by the individual wing, based on the total harvest for estimated by the Hunter Survey

11. commonName = the full name/description associated with the four letter species

