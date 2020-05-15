
import {
  createStyle,
  cls,
} from 'src/Styles';

export default createStyle({
  weatherContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  weatherHeader: {
    borderRadius: 20,
    backgroundColor: cls.blue,
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginBottom: 50,
  },
  weatherHeaderModal: {
    backgroundColor: cls.white,
    borderColor: cls.gray,
    borderBottomWidth: 1,
    paddingTop: 0,
  },
  weatherHeaderTextModal: {
    color: cls.black,
  },
  weatherHeaderImage: {
    height: 64,
    width: 67,
  },
  weatherHeaderData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weatherDaysContainer: {
    marginHorizontal: 30,
  },
  weatherDaysItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  weatherDaysImage: {
    height: 18,
    width: 33,
    alignSelf: 'center',
  },
  locationTopContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 230,
    backgroundColor: cls.blue,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  locationTopContainerText: {
    alignSelf: 'center',
    marginBottom: 230 / 2,
    fontSize: 17,
  },
  locationTopSubContainer: {
    position: 'absolute',
    bottom: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 200,
    borderTopWidth: 100,
    borderRightColor: 'transparent',
    borderTopColor: cls.white,
    transform: [
      { rotate: '180deg' },
    ],
  },
  locationSwipeContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    marginHorizontal: 15,
  },
  locationSwipeDataContainer: {
    flexGrow: 1,
    backgroundColor: cls.white,
    marginBottom: 30,
    borderRadius: 20,
    elevation: 3,
    shadowColor: cls.gray,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  topLineBl: {
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 27,
  },
  topLine: {
    alignSelf: 'center',
    backgroundColor: cls.red,
    borderRadius: 3,
    height: 4,
    width: 40,
  },
  degreeBl: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: cls.gray,
  },
  degreeButton: {
    paddingVertical: 15,
    paddingHorizontal: 35,
  },
  degreeButtonActive: {
    backgroundColor: cls.blue,
    borderRadius: 7,
  },
  degreeButtonIcon: {
    tintColor: cls.gray,
  },
  degreeButtonIconActive: {
    tintColor: cls.white,
  },
});
