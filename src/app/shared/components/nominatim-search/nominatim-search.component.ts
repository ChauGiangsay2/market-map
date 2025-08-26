import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  input
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';
import { NominatimPlace, NominatimService } from '../../services/nominatim.service';

// PrimeNG modules
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PanelModule } from 'primeng/panel';
import { ListboxModule } from 'primeng/listbox';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-nominatim-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ProgressSpinnerModule,
    PanelModule,
    ListboxModule
  ],
  templateUrl: './nominatim-search.component.html',
  styleUrls: ['./nominatim-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NominatimSearchComponent implements OnInit, OnDestroy {
  // ✅ Angular 17 input signals
  readonly placeholder = input('Search places…');
  readonly limit = input(8);
  readonly viewbox = input<string>();
  readonly bounded = input(false);
  readonly lang = input('vi,en');
  readonly countrycodes = input<string>();

  /** Emits when a place is chosen */
  @Output() placeSelected = new EventEmitter<NominatimPlace>();

  query = new FormControl<string>('');
  results$!: Observable<NominatimPlace[]>;
  loading = false;
  hasFocus = false;
  activeIndex = -1; // keyboard navigation
  resultsLength = 0;

  private destroy$ = new Subject<void>();

  constructor(private nominatim: NominatimService) {}

  ngOnInit(): void {
    this.results$ = this.query.valueChanges.pipe(
      filter((q): q is string => q !== null),
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        this.loading = true;
        this.activeIndex = -1;
      }),
      switchMap(q =>
        this.nominatim.search({
          q,
          limit: this.limit(),
          viewbox: this.viewbox(),
          bounded: this.bounded(),
          countrycodes: this.countrycodes(),
          lang: this.lang()
        })
      ),
      tap(results => {
        this.resultsLength = results.length;
        this.loading = false;
      }),
      takeUntil(this.destroy$)
    );
  }

  onPick(p: NominatimPlace): void {
    this.placeSelected.emit(p);
    this.query.setValue(p.display_name, { emitEvent: false });
    this.hasFocus = false;
  }

  onKeydown(e: KeyboardEvent, listLength: number): void {
    if (!listLength) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.activeIndex = (this.activeIndex + 1) % listLength;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.activeIndex = (this.activeIndex - 1 + listLength) % listLength;
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (this.activeIndex >= 0) {
        // handled in template
      }
    } else if (e.key === 'Escape') {
      this.hasFocus = false;
    }
  }

  trackById(_i: number, p: NominatimPlace) {
    return p.place_id;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
