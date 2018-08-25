import { Component, OnInit, OnDestroy } from '@angular/core';
import { EditButtonService } from '../../Services/edit-button.service';
import { ActivatedRoute } from '@angular/router';
import { UrlChangeDetection } from '../../Parent-Classes/url-changes';

@Component({
  selector: 'app-user-page',
  template: 
  `
    <navbar></navbar>
    <div class="wrapper">
    <profile-pic></profile-pic>
    <feed></feed>
    This tale grew in the telling, until it became a history of the Great War of the Ring and included many glimpses of the yet more ancient history that preceded it. It was begun soon after The Hobbit was written and before its publication in 1937; but I did not go on with this sequel, for I wished first to complete and set in order the mythology and legends of the Elder Days, which had then been taking shape for some years. I desired to do this for my own satisfaction, and I had little hope that other people would be interested in this work, especially since it was primarily linguistic in inspiration and was begun in order to provide the necessary background of 'history' for Elvish tongues.

    When those whose advice and opinion I sought corrected little hope to no hope, I went back to the sequel, encouraged by requests from readers for more information concerning hobbits and their adventures. But the story was drawn irresistibly towards the older world, and became an account, as it were, of its end and passing away before its beginning and middle had been told. The process had begun in the writing of The Hobbit, in which there were already some references to the older matter: Elrond, Gondolin, the High-elves, and the orcs, as well as glimpses that had arisen unbidden of things higher or deeper or darker than its surface: Durin, Moria, Gandalf, the Necromancer, the Ring. The discovery of the significance of these glimpses and of their relation to the ancient histories revealed the Third Age and its culmination in the War of the Ring.
    
    Those who had asked for more information about hobbits eventually got it, but they had to wait a long time; for the composition of The Lord of the Rings went on at intervals during the years 1936 to 1949, a period in which I had many duties that I did not neglect, and many other interests as a learner and teacher that often absorbed me. The delay was, of course, also increased by the outbreak of war in 1939, by the end of which year the tale had not yet reached the end of Book One. In spite of the darkness of the next five years I found that the story could not now be wholly abandoned, and I plodded on, mostly by night, till I stood by Balin's tomb in Moria. There I halted for a long while. It was almost a year later when I went on and so came to Lothlórien and the Great River late in 1941. In the next year I wrote the first drafts of the matter that now stands as Book Three, and the beginnings of chapters I and III of Book Five; and there as the beacons flared in Anórien and Théoden came to Harrowdale I stopped. Foresight had failed and there was no time for thought.
    
    It was during 1944 that, leaving the loose ends and perplexities of a war which it was my task to conduct, or at least to report, I forced myself to tackle the journey of Frodo to Mordor. These chapters, eventually to become Book Four, were written and sent out as a serial to my son, Christopher, then in South Africa with the RAF. Nonetheless it took another five years before the tale was brought to its present end; in that time I changed my house, my chair, and my college, and the days though less dark were no less laborious. Then when the 'end' had at last been reached the whole story had to be revised, and indeed largely re-written backwards. And it had to be typed, and re-typed: by me; the cost of professional typing by the ten-fingered was beyond my means.
    
    The Lord of the Rings has been read by many people since it finally appeared in print; and I should like to say something here with reference to the many opinions or guesses that I have received or have read concerning the motives and meaning of the tale. The prime motive was the desire of a tale-teller to try his hand at a really long story that would hold the attention of readers, amuse them, delight them, and at times maybe excite them or deeply move them. As a guide I had only my own feelings for what is appealing or moving, and for many the guide was inevitably often at fault. Some who have read the book, or at any rate have reviewed it, have found it boring, absurd, or contemptible; and I have no cause to complain, since I have similar opinions of their works, or of the kinds of writing that they evidently prefer. But even from the points of view of many who have enjoyed my story there is much that fails to please. It is perhaps not possible in a long tale to please everybody at all points, nor to displease everybody at the same points; for I find from the letters that I have received that the passages or chapters that are to some a blemish are all by others specially approved. The most critical reader of all, myself, now finds many defects, minor and major, but being fortunately under no obligation either to review the book or to write it again, he will pass over these in silence, except one that has been noted by others: the book is too short.
    
    As for any inner meaning or 'message', it has in the intention of the author none. It is neither allegorical nor topical. As the story grew it put down roots (into the past) and threw out unexpected branches: but its main theme was settled from the outset by the inevitable choice of the Ring as the link between it and The Hobbit. The crucial chapter, "The Shadow of the Past', is one of the oldest parts of the tale. It was written long before the foreshadow of 1939 had yet become a threat of inevitable disaster, and from that point the story would have developed along essentially the same lines, if that disaster had been averted. Its sources are things long before in mind, or in some cases already written, and little or nothing in it was modified by the war that began in 1939 or its sequels.
    
    The real war does not resemble the legendary war in its process or its conclusion. If it had inspired or directed the development of the legend, then certainly the Ring would have been seized and used against Sauron; he would not have been annihilated but enslaved, and Barad-dûr would not have been destroyed but occupied. Saruman, failing to get possession of the Ring, would in the confusion and treacheries of the time have found in Mordor the missing links in his own researches into Ring-lore, and before long he would have made a Great Ring of his own with which to challenge the self-styled Ruler of Middle-earth. In that conflict both sides would have held hobbits in hatred and contempt: they would not long have survived even as slaves.
    
    Other arrangements could be devised according to the tastes or views of those who like allegory or topical reference. But I cordially dislike allegory in all its manifestations, and always have done so since I grew old and wary enough to detect its presence. I much prefer history, true or feigned, with its varied applicability to the thought and experience of readers. I think that many confuse 'applicability' with 'allegory'; but the one resides in the freedom of the reader, and the other in the purposed domination of the author.
    
    An author cannot of course remain wholly unaffected by his experience, but the ways in which a story-germ uses the soil of experience are extremely complex, and attempts to define the process are at best guesses from evidence that is inadequate and ambiguous. It is also false, though naturally attractive, when the lives of an author and critic have overlapped, to suppose that the movements of thought or the events of times common to both were necessarily the most powerful influences. One has indeed personally to come under the shadow of war to feel fully its oppression; but as the years go by it seems now often forgotten that to be caught in youth by 1914 was no less hideous an experience than to be involved in 1939 and the following years. By 1918 all but one of my close friends were dead. Or to take a less grievous matter: it has been supposed by some that 'The Scouring of the Shire' reflects the situation in England at the time when I was finishing my tale. It does not. It is an essential part of the plot, foreseen from the outset, though in the event modified by the character of Saruman as developed in the story without, need I say, any allegorical significance or contemporary political reference whatsoever. It has indeed some basis in experience, though slender (for the economic situation was entirely different), and much further back. The country in which I lived in childhood was being shabbily destroyed before I was ten, in days when motor-cars were rare objects (I had never seen one) and men were still building suburban railways. Recently I saw in a paper a picture of the last decrepitude of the once thriving corn-mill beside its pool that long ago seemed to me so important. I never liked the looks of the Young miller, but his father, the Old miller, had a black beard, and he was not named Sandyman.
    
    The Lord of the Rings is now issued in a new edition, and the opportunity has been taken of revising it. A number of errors and inconsistencies that still remained in the text have been corrected, and an attempt has been made to provide information on a few points which attentive readers have raised. I have considered all their comments and enquiries, and if some seem to have been passed over that may be because I have failed to keep my notes in order; but many enquiries could only be answered by additional appendices, or indeed by the production of an accessory volume containing much of the material that I did not include in the original edition, in particular more detailed linguistic information. In the meantime this edition offers this Foreword, an addition to the Prologue, some notes, and an index of the names of persons and places. This index is in intention complete in items but not in references, since for the present purpose it has been necessary to reduce its bulk. A complete index, making full use of the material prepared for me by Mrs. N. Smith, belongs rather to the accessory volume.
    
     
    
     
    
    Prologue
     
    
    1. Concerning Hobbits
    This book is largely concerned with Hobbits, and from its pages a reader may discover much of their character and a little of their history. Further information will also be found in the selection from the Red Book of Westmarch that has already been published, under the title of The Hobbit. That story was derived from the earlier chapters of the Red Book, composed by Bilbo himself, the first Hobbit to become famous in the world at large, and called by him There and Back Again, since they told of his journey into the East and his return: an adventure which later involved all the Hobbits in the great events of that Age that are here related.
    
    Many, however, may wish to know more about this remarkable people from the outset, while some may not possess the earlier book. For such readers a few notes on the more important points are here collected from Hobbit-lore, and the first adventure is briefly recalled.
    
    Hobbits are an unobtrusive but very ancient people, more numerous formerly than they are today; for they love peace and quiet and good tilled earth: a well-ordered and well-farmed countryside was their favourite haunt. They do not and did not understand or like machines more complicated than a forge-bellows, a water-mill, or a hand-loom, though they were skilful with tools. Even in ancient days they were, as a rule, shy of 'the Big Folk', as they call us, and now they avoid us with dismay and are becoming hard to find. They are quick of hearing and sharp-eyed, and though they are inclined to be fat and do not hurry unnecessarily, they are nonetheless nimble and deft in their movements. They possessed from the first the art of disappearing swiftly and silently, when large folk whom they do not wish to meet come blundering by; and this an they have developed until to Men it may seem magical. But Hobbits have never, in fact, studied magic of any kind, and their elusiveness is due solely to a professional skill that heredity and practice, and a close friendship with the earth, have rendered inimitable by bigger and clumsier races.
    
    For they are a little people, smaller than Dwarves: less tout and stocky, that is, even when they are not actually much shorter. Their height is variable, ranging between two and four feet of our measure. They seldom now reach three feet; but they hive dwindled, they say, and in ancient days they were taller. According to the Red Book, Bandobras Took (Bullroarer), son of Isengrim the Second, was four foot five and able to ride a horse. He was surpassed in all Hobbit records only by two famous characters of old; but that curious matter is dealt with in this book.
    
    As for the Hobbits of the Shire, with whom these tales are concerned, in the days of their peace and prosperity they were a merry folk. They dressed in bright colours, being notably fond of yellow and green; but they seldom wore shoes, since their feet had tough leathery soles and were clad in a thick curling hair, much like the hair of their heads, which was commonly brown. Thus, the only craft little practised among them was shoe-making; but they had long and skilful fingers and could make many other useful and comely things. Their faces were as a rule good-natured rather than beautiful, broad, bright-eyed, red-cheeked, with mouths apt to laughter, and to eating and drinking. And laugh they did, and eat, and drink, often and heartily, being fond of simple jests at all times, and of six meals a day (when they could get them). They were hospitable and delighted in parties, and in presents, which they gave away freely and eagerly accepted.
    
    It is plain indeed that in spite of later estrangement Hobbits are relatives of ours: far nearer to us than Elves, or even than Dwarves. Of old they spoke the languages of Men, after their own fashion, and liked and disliked much the same things as Men did. But what exactly our relationship is can no longer be discovered. The beginning of Hobbits lies far back in the Elder Days that are now lost and forgotten. Only the Elves still preserve any records of that vanished time, and their traditions are concerned almost entirely with their own history, in which Men appear seldom and Hobbits are not mentioned at all. Yet it is clear that Hobbits had, in fact, lived quietly in Middle-earth for many long years before other folk became even aware of them. And the world being after all full of strange creatures beyond count, these little people seemed of very little importance. But in the days of Bilbo, and of Frodo his heir, they suddenly became, by no wish of their own, both important and renowned, and troubled the counsels of the Wise and the Great.
    
    Those days, the Third Age of Middle-earth, are now long past, and the shape of all lands has been changed; but the regions in which Hobbits then lived were doubtless the same as those in which they still linger: the North-West of the Old World, east of the Sea. Of their original home the Hobbits in Bilbo's time preserved no knowledge. A love of learning (other than genealogical lore) was far from general among them, but there remained still a few in the older families who studied their own books, and even gathered reports of old times and distant lands from Elves, Dwarves, and Men. Their own records began only after the settlement of the Shire, and their most ancient legends hardly looked further back than their Wandering Days. It is clear, nonetheless, from these legends, and from the evidence of their peculiar words and customs, that like many other folk Hobbits had in the distant past moved westward. Their earliest tales seem to glimpse a time when they dwelt in the upper vales of Anduin, between the eaves of Greenwood the Great and the Misty Mountains. Why they later undertook the hard and perilous crossing of the mountains into Eriador is no longer certain. Their own accounts speak of the multiplying of Men in the land, and of a shadow that fell on the forest, so that it became darkened and its new name was Mirkwood.
    
    Before the crossing of the mountains the Hobbits had already become divided into three somewhat different breeds: Harfoots, Stoors, and Fallohides. The Harfoots were browner of skin, smaller, and shorter, and they were beardless and bootless; their hands and feet were neat and nimble; and they preferred highlands and hillsides. The Stoors were broader, heavier in build; their feet and hands were larger, and they preferred flat lands and riversides. The Fallohides were fairer of skin and also of hair, and they were taller and slimmer than the others; they were lovers of trees and of woodlands.
    
    The Harfoots had much to do with Dwarves in ancient times, and long lived in the foothills of the mountains. They moved westward early, and roamed over Eriador as far as Weathertop while the others were still in the Wilderland. They were the most normal and representative variety of Hobbit, and far the most numerous. They were the most inclined to settle in one place, a
    </div>
  `
  ,
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent extends UrlChangeDetection implements OnInit {
  
  constructor(private editService : EditButtonService, private route: ActivatedRoute) { 
    super(route);
   }

  editStatus : string = "Edit your list";
  pageOwner : boolean = false;

  ngOnInit() 
  {
    this.detectUidChanges();
    this.editServiceSetup();
  }

  editServiceSetup()
  {
    this.editService.editValueChange.subscribe( editMode => {
      if(editMode)
        this.editStatus="Save";
      else
        this.editStatus="Edit your list";
    });
  }

  loadOnUrlChange(params: any) {
    this.editService.reset();
    if(params.uid=="zboi")
      this.editService.emitPageOwnerStatus(true);
    else
      this.editService.emitPageOwnerStatus(false);
  }

  toggleEditMode()
  {
    this.editService.toggle();
  }

}