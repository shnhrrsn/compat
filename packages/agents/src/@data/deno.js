/** @type {import('../Agent').Agent} */
const deno = {
	name: "Deno",
	versions: new Map([
		[
			"1.29.2",
			{
				"date": 1672932003
			}
		],
		[
			"1.29.1",
			{
				"date": 1671128917
			}
		],
		[
			"1.29.0",
			{
				"date": 1671067017
			}
		],
		[
			"1.28.3",
			{
				"date": 1669900005
			}
		],
		[
			"1.28.2",
			{
				"date": 1669327189
			}
		],
		[
			"1.28.1",
			{
				"date": 1668647766
			}
		],
		[
			"1.28.0",
			{
				"date": 1668377566
			}
		],
		[
			"1.27.2",
			{
				"date": 1667949758
			}
		],
		[
			"1.27.1",
			{
				"date": 1667518381
			}
		],
		[
			"1.27.0",
			{
				"date": 1666890163
			}
		],
		[
			"1.26.2",
			{
				"date": 1666038586
			}
		],
		[
			"1.26.1",
			{
				"date": 1665088940
			}
		],
		[
			"1.26.0",
			{
				"date": 1664408600
			}
		],
		[
			"1.25.4",
			{
				"date": 1663876508
			}
		],
		[
			"1.25.3",
			{
				"date": 1663272256
			}
		],
		[
			"1.25.2",
			{
				"date": 1662721757
			}
		],
		[
			"1.25.1",
			{
				"date": 1662097124
			}
		],
		[
			"1.25.0",
			{
				"date": 1661389803
			}
		],
		[
			"1.24.3",
			{
				"date": 1660248711
			}
		],
		[
			"1.24.2",
			{
				"date": 1659649602
			}
		],
		[
			"1.24.1",
			{
				"date": 1659037198
			}
		],
		[
			"1.24.0",
			{
				"date": 1658371350
			}
		],
		[
			"1.23.4",
			{
				"date": 1657657450
			}
		],
		[
			"1.23.3",
			{
				"date": 1657044850
			}
		],
		[
			"1.23.2",
			{
				"date": 1656626145
			}
		],
		[
			"1.23.1",
			{
				"date": 1656017858
			}
		],
		[
			"1.23.0",
			{
				"date": 1655337861
			}
		],
		[
			"1.22.3",
			{
				"date": 1654805889
			}
		],
		[
			"1.22.2",
			{
				"date": 1654194815
			}
		],
		[
			"1.22.1",
			{
				"date": 1653630225
			}
		],
		[
			"1.22.0",
			{
				"date": 1652891027
			}
		],
		[
			"1.21.3",
			{
				"date": 1652368947
			}
		],
		[
			"1.21.2",
			{
				"date": 1651791065
			}
		],
		[
			"1.21.1",
			{
				"date": 1651183104
			}
		],
		[
			"1.21.0",
			{
				"date": 1650510878
			}
		],
		[
			"1.20.6",
			{
				"date": 1649971542
			}
		],
		[
			"1.20.5",
			{
				"date": 1649356690
			}
		],
		[
			"1.20.4",
			{
				"date": 1648755639
			}
		],
		[
			"1.20.3",
			{
				"date": 1648227324
			}
		],
		[
			"1.20.2",
			{
				"date": 1648092798
			}
		],
		[
			"1.20.1",
			{
				"date": 1647484645
			}
		],
		[
			"1.19.3",
			{
				"date": 1646915149
			}
		],
		[
			"1.19.2",
			{
				"date": 1646329717
			}
		],
		[
			"1.19.1",
			{
				"date": 1645738053
			}
		],
		[
			"1.19.0",
			{
				"date": 1645063012
			}
		],
		[
			"1.18.2",
			{
				"date": 1643939177
			}
		],
		[
			"1.18.1",
			{
				"date": 1643304220
			}
		],
		[
			"1.18.0",
			{
				"date": 1642699265
			}
		],
		[
			"1.17.3",
			{
				"date": 1642010683
			}
		],
		[
			"1.17.2",
			{
				"date": 1641412544
			}
		],
		[
			"1.17.1",
			{
				"date": 1640197881
			}
		],
		[
			"1.17.0",
			{
				"date": 1639683054
			}
		],
		[
			"1.16.4",
			{
				"date": 1638559904
			}
		],
		[
			"1.16.3",
			{
				"date": 1637797255
			}
		],
		[
			"1.16.2",
			{
				"date": 1637168162
			}
		],
		[
			"1.16.1",
			{
				"date": 1636633984
			}
		],
		[
			"1.16.0",
			{
				"date": 1636466183
			}
		],
		[
			"1.15.3",
			{
				"date": 1635162469
			}
		],
		[
			"1.15.2",
			{
				"date": 1634591337
			}
		],
		[
			"1.15.1",
			{
				"date": 1634128864
			}
		],
		[
			"1.15.0",
			{
				"date": 1634069458
			}
		],
		[
			"1.14.3",
			{
				"date": 1633390018
			}
		],
		[
			"1.14.2",
			{
				"date": 1632836857
			}
		],
		[
			"1.14.1",
			{
				"date": 1632268265
			}
		],
		[
			"1.14.0",
			{
				"date": 1631659318
			}
		],
		[
			"1.13.2",
			{
				"date": 1629757416
			}
		],
		[
			"1.13.1",
			{
				"date": 1629152345
			}
		],
		[
			"1.13.0",
			{
				"date": 1628609252
			}
		],
		[
			"1.12.2",
			{
				"date": 1627312762
			}
		],
		[
			"1.12.1",
			{
				"date": 1626725267
			}
		],
		[
			"1.12.0",
			{
				"date": 1626187406
			}
		],
		[
			"1.11.5",
			{
				"date": 1625306206
			}
		],
		[
			"1.11.4",
			{
				"date": 1625145477
			}
		],
		[
			"1.11.3",
			{
				"date": 1624989487
			}
		],
		[
			"1.11.2",
			{
				"date": 1624296280
			}
		],
		[
			"1.11.1",
			{
				"date": 1623796776
			}
		],
		[
			"1.11.0",
			{
				"date": 1623184621
			}
		],
		[
			"1.10.3",
			{
				"date": 1622497916
			}
		],
		[
			"1.10.2",
			{
				"date": 1621271534
			}
		],
		[
			"1.10.1",
			{
				"date": 1620794334
			}
		],
		[
			"1.9.2",
			{
				"date": 1619191623
			}
		],
		[
			"1.9.1",
			{
				"date": 1618971850
			}
		],
		[
			"1.9.0",
			{
				"date": 1618340655
			}
		],
		[
			"1.8.3",
			{
				"date": 1617361911
			}
		],
		[
			"1.8.2",
			{
				"date": 1616361863
			}
		],
		[
			"1.8.1",
			{
				"date": 1615327630
			}
		],
		[
			"1.8.0",
			{
				"date": 1614731094
			}
		],
		[
			"1.7.5",
			{
				"date": 1613750347
			}
		],
		[
			"1.7.4",
			{
				"date": 1613227274
			}
		],
		[
			"1.7.2",
			{
				"date": 1612558660
			}
		],
		[
			"1.7.1",
			{
				"date": 1611935042
			}
		],
		[
			"1.7.0",
			{
				"date": 1611122713
			}
		],
		[
			"1.6.3",
			{
				"date": 1609344364
			}
		],
		[
			"1.6.2",
			{
				"date": 1608657184
			}
		],
		[
			"1.6.1",
			{
				"date": 1607979531
			}
		],
		[
			"1.6.0",
			{
				"date": 1607442896
			}
		],
		[
			"1.5.4",
			{
				"date": 1606143656
			}
		],
		[
			"1.5.3",
			{
				"date": 1605526851
			}
		],
		[
			"1.5.2",
			{
				"date": 1604881815
			}
		],
		[
			"1.5.1",
			{
				"date": 1604157130
			}
		],
		[
			"1.5.0",
			{
				"date": 1603813012
			}
		],
		[
			"1.4.6",
			{
				"date": 1602327660
			}
		],
		[
			"1.4.5",
			{
				"date": 1602161623
			}
		],
		[
			"1.4.4",
			{
				"date": 1601731937
			}
		],
		[
			"1.4.3",
			{
				"date": 1601644142
			}
		],
		[
			"1.4.2",
			{
				"date": 1601047409
			}
		],
		[
			"1.4.1",
			{
				"date": 1600462469
			}
		],
		[
			"1.4.0",
			{
				"date": 1600009810
			}
		],
		[
			"1.3.3",
			{
				"date": 1599240484
			}
		],
		[
			"1.3.2",
			{
				"date": 1598711352
			}
		],
		[
			"1.3.1",
			{
				"date": 1598030075
			}
		],
		[
			"1.3.0",
			{
				"date": 1597337378
			}
		],
		[
			"1.2.3",
			{
				"date": 1596938212
			}
		],
		[
			"1.2.2",
			{
				"date": 1596229606
			}
		],
		[
			"1.2.1",
			{
				"date": 1595587907
			}
		],
		[
			"1.2.0",
			{
				"date": 1594661193
			}
		],
		[
			"1.1.3",
			{
				"date": 1593808225
			}
		],
		[
			"1.1.2",
			{
				"date": 1593209137
			}
		],
		[
			"1.1.1",
			{
				"date": 1592594659
			}
		],
		[
			"1.1.0",
			{
				"date": 1591982283
			}
		],
		[
			"1.0.5",
			{
				"date": 1591205064
			}
		],
		[
			"1.0.4",
			{
				"date": 1591115470
			}
		],
		[
			"1.0.3",
			{
				"date": 1590788254
			}
		],
		[
			"1.0.2",
			{
				"date": 1590179403
			}
		],
		[
			"1.0.1",
			{
				"date": 1589994046
			}
		],
		[
			"1.0.0",
			{
				"date": 1588623707
			}
		],
		[
			"0.42.0",
			{
				"date": 1588195573
			}
		],
		[
			"0.41.0",
			{
				"date": 1587049982
			}
		],
		[
			"0.40.0",
			{
				"date": 1586373892
			}
		],
		[
			"0.39.0",
			{
				"date": 1585940887
			}
		],
		[
			"0.38.0",
			{
				"date": 1585430513
			}
		],
		[
			"0.37.1",
			{
				"date": 1584999594
			}
		],
		[
			"0.37.0",
			{
				"date": 1584982540
			}
		],
		[
			"0.36.0",
			{
				"date": 1583971061
			}
		],
		[
			"0.35.0",
			{
				"date": 1582983609
			}
		],
		[
			"0.34.0",
			{
				"date": 1582216146
			}
		],
		[
			"0.33.0",
			{
				"date": 1581635770
			}
		],
		[
			"0.32.0",
			{
				"date": 1580751620
			}
		],
		[
			"0.31.0",
			{
				"date": 1579885525
			}
		],
		[
			"0.30.0",
			{
				"date": 1579356861
			}
		],
		[
			"0.29.0",
			{
				"date": 1578601309
			}
		],
		[
			"0.28.1",
			{
				"date": 1578064316
			}
		],
		[
			"0.28.0",
			{
				"date": 1577974109
			}
		],
		[
			"0.27.0",
			{
				"date": 1576717391
			}
		],
		[
			"0.26.0",
			{
				"date": 1575601985
			}
		],
		[
			"0.25.0",
			{
				"date": 1574799272
			}
		],
		[
			"0.24.0",
			{
				"date": 1573791525
			}
		],
		[
			"0.23.0",
			{
				"date": 1572976314
			}
		],
		[
			"0.22.0",
			{
				"date": 1572292542
			}
		],
		[
			"0.21.0",
			{
				"date": 1571526155
			}
		],
		[
			"0.20.0",
			{
				"date": 1570468587
			}
		],
		[
			"0.19.0",
			{
				"date": 1569426595
			}
		],
		[
			"0.18.0",
			{
				"date": 1568408396
			}
		],
		[
			"0.14.0",
			{
				"date": 1565317263
			}
		],
		[
			"0.12.0",
			{
				"date": 1563310131
			}
		],
		[
			"0.11.0",
			{
				"date": 1562517627
			}
		],
		[
			"0.10.0",
			{
				"date": 1561473534
			}
		],
		[
			"0.4.0",
			{
				"date": 1556927538
			}
		],
		[
			"0.3.7",
			{
				"date": 1555012482
			}
		],
		[
			"0.3.6",
			{
				"date": 1554388184
			}
		],
		[
			"0.3.4",
			{
				"date": 1553124356
			}
		],
		[
			"0.3.2",
			{
				"date": 1551926593
			}
		],
		[
			"0.3.1",
			{
				"date": 1551304090
			}
		],
		[
			"0.3.0",
			{
				"date": 1550551139
			}
		],
		[
			"0.2.11",
			{
				"date": 1549687929
			}
		],
		[
			"0.2.10",
			{
				"date": 1549150684
			}
		],
		[
			"0.2.9",
			{
				"date": 1548821542
			}
		],
		[
			"0.2.8",
			{
				"date": 1547917763
			}
		],
		[
			"0.2.7",
			{
				"date": 1547516453
			}
		],
		[
			"0.2.6",
			{
				"date": 1546901270
			}
		],
		[
			"0.2.5",
			{
				"date": 1546371911
			}
		],
		[
			"0.2.4",
			{
				"date": 1545627224
			}
		],
		[
			"0.2.3",
			{
				"date": 1544819450
			}
		],
		[
			"0.2.2",
			{
				"date": 1544223614
			}
		],
		[
			"0.2.1",
			{
				"date": 1543625514
			}
		],
		[
			"0.2.0",
			{
				"date": 1542346557
			}
		],
		[
			"0.1.12",
			{
				"date": 1542043783
			}
		],
		[
			"0.1.11",
			{
				"date": 1541459171
			}
		],
		[
			"0.1.10",
			{
				"date": 1540653815
			}
		],
		[
			"0.1.9",
			{
				"date": 1540082962
			}
		],
		[
			"0.1.8",
			{
				"date": 1539370637
			}
		],
		[
			"0.1.7",
			{
				"date": 1538658633
			}
		],
		[
			"0.1.5",
			{
				"date": 1537587058
			}
		],
		[
			"0.1.3",
			{
				"date": 1536204088
			}
		],
		[
			"0.1.1",
			{
				"date": 1535464834
			}
		],
		[
			"0.1.0",
			{
				"date": 1535035749
			}
		]
	])
}

export default deno